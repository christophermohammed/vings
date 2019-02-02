import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import { Colors } from '../utilities/utils';

const HomeCard = (props) => {
    const amt = props.item.netSav;
    const modAmt = (amt < 0) ? (-1 * amt) : amt;
    const amountStyle = [styles.amountText, (amt < 0) ? {color: Colors.red} : {color: Colors.green}];
    return (
        <View style={styles.container}>
            <Text style={amountStyle}>{(amt < 0) ? "-$" : "$"}</Text>
            <Text style={amountStyle}>{Math.round(modAmt * 100) / 100}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90
    },
    amountText: {
        fontSize: 40
    },
});

export default HomeCard;