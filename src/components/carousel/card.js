import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SCREEN_HEIGHT } from '../../utilities/utils';

const IMAGE_HEIGHT = SCREEN_HEIGHT / 2;

class CarouselCard extends Component {
    handleLink = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
              if (!supported) {
                console.log("Can't handle url: " + url);
              } else {
                return Linking.openURL(url);
              }
            })
        .catch((err) => console.error('An error occurred', err));
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: this.props.image.URI}} style={styles.homeImage}/>
                    </View>
                    <TouchableOpacity style={styles.textContainer} onPress={() => this.handleLink(this.props.image.URL)}>
                        <Image style={{width: 25, height: 25}} source={require('../../../assets/Seal.png')} />
                        <Text style={{fontSize: 18}}>   {this.props.image.Username}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: ((IMAGE_HEIGHT / 4) * 3) + 20,
        height: IMAGE_HEIGHT + (IMAGE_HEIGHT / 5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },  
    imageContainer: {
        width: ((IMAGE_HEIGHT / 4) * 3),
        height: IMAGE_HEIGHT,
    },  
    homeImage: {
        flex: 1,
        borderRadius: 10
    },
});

export default CarouselCard;