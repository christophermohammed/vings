import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../utilities';

const MWIButton = (props) => {
    const { title, buttonStyle, buttonTextStyle, iconName = "", iconColor = Colors.light } = props;

    renderButton = () => {
        if(iconName !== ""){
            return(
                <TouchableOpacity 
                    onPress={props.onPress}
                >
                    <View style={[buttonStyle, {flexDirection: 'row'}]}>
                        <Text style={buttonTextStyle}>{title}</Text>
                        <Icon 
                            name={iconName}
                            size={24}
                            color={iconColor}
                        />
                    </View>
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity 
                    onPress={props.onPress}
                >
                    <View style={buttonStyle}>
                        <Text style={buttonTextStyle}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    return (
        renderButton()
    );
}

export default MWIButton;