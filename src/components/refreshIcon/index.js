import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utilities/utils';

const RefreshIcon = (props) => {
    return (
        <View>
            <TouchableOpacity onPress={props.refresh}>
                <Icon name="ios-refresh" color={Colors.main} size={20} />
            </TouchableOpacity>
        </View>
    );
}

export default RefreshIcon;
