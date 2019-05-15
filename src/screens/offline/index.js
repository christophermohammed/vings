import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';

const Offline = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View>
        <Image source={require('../../../assets/wifiOffline.png')} style={styles.image}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Seems like you're offline...</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Connect to the internet to keep saving!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  image: {
    flex: 0
  },
  textContainer: {
    padding: 5
  },
  text: {
    fontSize: 15
  }
});

export default Offline;