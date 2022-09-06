import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import MusicPlayer from './screens/musicPlayer/musicPlayer';


const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor='transparent' />
      <MusicPlayer />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})