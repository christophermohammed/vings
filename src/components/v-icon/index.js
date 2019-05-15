import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utilities';

const VIcon = (props) => {
    return (
        <View>
            <TouchableOpacity onPress={props.action}>
                <Icon name={(props.name) ? props.name : "ios-refresh"} color={Colors.main} size={props.size} />
            </TouchableOpacity>
        </View>
    );
}

export default VIcon;
