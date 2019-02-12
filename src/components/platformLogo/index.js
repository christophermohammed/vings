import React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlatformLogo = (props) => {
    switch(props.platform) {
        case "twitter":
            return(
                <View>
                    <Icon name="logo-twitter" color="black" size={25}/>
                </View>
            );
        case "facebook":
            return(
                <View>
                    <Icon name="logo-facebook" color="black" size={25}/>
                </View>
            );
        case "instagram":
            return(
                <View>
                    <Icon name="logo-instagram" color="black" size={25}/>
                </View>
            );
        case "VSCO":
            return(
                <View>
                    <Image style={{width: 25, height: 25}} source={require('../../../assets/Seal.png')} />
                </View>
            );
        default:
            return(
                <View>
                    
                </View>
            );
    }
}

export default PlatformLogo;