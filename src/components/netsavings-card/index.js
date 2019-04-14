import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import commonStyles from '../../utilities/common-styles';
import { Colors, to2Dp } from '../../utilities/utils';

const NetSavingsCard = (props) => {
    const { currency, netSav } = props;
    const amt = netSav;
    const modAmt = (amt < 0) ? (-1 * amt) : amt;
    const amountStyle = (amt < 0) ? {color: Colors.red} : {color: Colors.green};
    return (
        <View style={styles.container}>
            <View style={commonStyles.center}>
                <Text style={[amountStyle, {fontSize: 40}]}>{(amt < 0) ? `-${to2Dp(modAmt)}` : to2Dp(modAmt)}</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={[amountStyle, {fontSize: 25}]}>{currency.symbol}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 70
    },
});

export default NetSavingsCard;