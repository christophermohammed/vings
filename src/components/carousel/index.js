import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../utilities/utils';

class Carousel extends Component {
    render() {
        return (
            <View>
                <Image source={require('./../../../assets/BeachFace.jpg')} style={styles.homeImage}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    homeImage: {
      width: SCREEN_WIDTH - 20,
      height: SCREEN_WIDTH - 20,
      borderRadius: 10,
      marginTop: 20
    },
  });

export default Carousel;