import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH, IMAGE_HEIGHT, IMAGE_WIDTH, Colors } from '../../utilities/utils';
import { Icon } from 'react-native-vector-icons/Ionicons';

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

    getIcon = (platform) => {
        let res;
        switch(platform) {
            case "twitter":
                res = <Icon name="logo-twitter" color="black" size={25}/>;
            break;
            case "facebook":
                res = <Icon name="logo-facebook" color="black" size={25}/>;
            break;
            case "instagram":
                res = <Icon name="logo-instagram" color="black" size={25}/>;
            break;
            case "vsco":
                res = <Image style={{width: 25, height: 25}} source={require('../../../assets/Seal.png')} />
            break;
        }
        return res;
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
                        {this.getIcon}
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