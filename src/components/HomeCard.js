import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import { Colors } from '../utilities/utils';

const HomeCard = (props) => {
    const amt = props.item.netSav;
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 18}}>{(amt < 0) ? "You're out:" : "You're saving:"}</Text>
            <Text style={[styles.amountText, (amt < 0) ? {color: Colors.red} : {color: Colors.green}]}>${Math.round(amt * 100) / 100}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        height: 90
    },
    amountText: {
        fontSize: 60
    },
});

export default HomeCard;