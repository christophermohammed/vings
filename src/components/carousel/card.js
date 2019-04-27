import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, IMAGE_HEIGHT, IMAGE_WIDTH, Colors } from '../../utilities';
import PlatformLogo from '../platform-logo';
import Icon from 'react-native-vector-icons/Ionicons';
import Tip from '../tip-of-the-day';
import commonStyles from '../../utilities/common-styles';

const CarouselCard = (props) => {
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

    let { image, tip } = props;
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
                    <Image source={{uri: image.URI, cache: 'force-cache'}} style={styles.homeImage}/>
                    <View style={[{position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.7)'}, styles.homeImage, styles.imageContainer]} />
                    <View style={[{position: 'absolute'}, styles.homeImage, styles.imageContainer, commonStyles.center]}>
                        <Tip tip={tip} />
                    </View>
                </View>
                <TouchableOpacity style={styles.textContainer} onPress={() => this.handleLink(image.URL)}>
                    <View style={{paddingTop: 2}}>
                        <Icon name="ios-camera" color="black" size={25}/>
                    </View>
                    <Text style={commonStyles.detailSubtitle}>  :  {image.Username}  </Text>
                    <PlatformLogo platform={image.Platform}/>
                </TouchableOpacity>
            </View>
        </View>
    );
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