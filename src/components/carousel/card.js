import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, IMAGE_HEIGHT, IMAGE_WIDTH, Colors } from '../../utilities/utils';
import PlatformLogo from '../platform-logo';

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
                    <View style={{position: "absolute"}}>
                        <ActivityIndicator
                          size="large"
                          color={Colors.main}
                        />
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: this.props.image.URI, cache: 'force-cache'}} style={styles.homeImage}/>                 
                    </View>
                    <TouchableOpacity style={styles.textContainer} onPress={() => this.handleLink(this.props.image.URL)}>
                        <PlatformLogo platform={this.props.image.Platform}/>
                        <Text style={{fontSize: 18}}>   {this.props.image.Username}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
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
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
    },  
    homeImage: {
        flex: 1,
        borderRadius: 10,
    },
});

export default CarouselCard;