import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, to2Dp } from '../../utilities';

const TransactionCard = (props) => {
    const { item } = props;
    let amt = item.amount;
    let cardColor = amt < 0 ? Colors.red : Colors.green;
    return (
        <View style={[styles.vCommon, {
                flexDirection: 'row',
                borderWidth: 3,
                borderRightColor:   'white',
                borderLeftColor:    cardColor,
                borderTopColor:     'white',
                borderBottomColor:  'white',
            }]}>
            <View style={styles.vCommon}>
                <Text style={{fontSize: 18}}>{item.description}</Text>
            </View>
            <View style={[{alignItems: 'center'}, styles.vCommon]}>
                <Text style={{fontSize: 30, color: cardColor}}>{to2Dp(amt)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    vCommon: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    }
});

export default TransactionCard;
