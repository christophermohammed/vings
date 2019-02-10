import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class Offline extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../../../assets/cellularOffline.png')} style={styles.image}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Seems like you're offline...</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Connect to the internet to keep saving!</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
        height: 80,
        width: 80
    },
    textContainer: {
        padding: 2.5
    },
    text: {
        fontSize: 15
    }
  });

export default Offline;