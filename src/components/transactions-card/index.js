import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, to2Dp } from '../../utilities';
import commonStyles from '../../utilities/common-styles';

const TransactionCard = (props) => {
    const { item } = props;
    let amt = item.amount;
    let cardColor = amt < 0 ? Colors.red : Colors.green;
    return (
        <View style={{}}>
            <View style={[styles.vCommon, {
                flexDirection: 'row',
                borderWidth: 3,
                borderRightColor:   'white',
                borderLeftColor:    cardColor,
                borderTopColor:     'white',
                borderBottomColor:  'white',
                }]}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={[{marginLeft: 5}, commonStyles.detailSubtitle]}>{item.description}</Text>
                </View>
                <View style={commonStyles.center}>
                    <Text style={{fontSize: 30, color: cardColor, marginRight: 15}}>{to2Dp(amt)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    vCommon: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white',
    }
});

export default TransactionCard;
