import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { TouchableOpacity, Platform, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if(permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if(pickerResult.cancelled === true) {
      return;
    }

    if(Platform.OS === "web") {
      if(!(await Sharing.isAvailableAsync())) {
        alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
        return;
      }
      Sharing.shareAsync(selectedImage.localUri);
    }
    setSelectedImage({localUri: pickerResult.uri});
  };

  let openShareDialogAsync = async() => {
    if(!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: selectedImage.localUri}}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pick a Photo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  
  instructions: {
    color: "#888", 
    fontSize: 28
  },

  button: {
    backgroundColor: "blue"
  },

  buttonText: {
    fontSize: 20, 
    color: "#fff"
  },

  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
