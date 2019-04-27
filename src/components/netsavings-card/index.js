import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import commonStyles from '../../utilities/common-styles';
import { Colors, to2Dp } from '../../utilities';

const NetSavingsCard = (props) => {
    const { currency } = props;
    const amt = currency && to2Dp(currency.netSav);
    const modAmt = (amt < 0) ? (-1 * amt) : amt;
    const amountStyle = (amt < 0) ? {color: Colors.red} : {color: Colors.green};
    return (
        <View style={[commonStyles.container, {backgroundColor: 'white', borderRadius: 10}, commonStyles.shadow]}>
            <View style={commonStyles.space}>
                <View style={commonStyles.center}>
                    <Text style={[amountStyle, {fontSize: 40}]}>{(amt < 0) ? `-${modAmt}` : modAmt}</Text>
                </View>
                <View style={[commonStyles.regRow]}>
                    <Text style={[amountStyle, {fontSize: 25}]}>{currency && currency.symbol}</Text>
                    <Text style={[amountStyle, {fontSize: 25}]}>{currency && currency.code}</Text>
                </View>
            </View>
        </View>
    );
}

export default NetSavingsCard;