import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>
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
  }
});
