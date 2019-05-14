import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors, to2Dp } from '../../utilities';
import commonStyles from '../../utilities/common-styles';

const TransactionCard = (props) => {
    const { item } = props;
    let cardColor = item.amount < 0 ? Colors.red : Colors.green;
    return (
        <View style={{
            borderWidth: 3,
            borderRightColor:   'white',
            borderLeftColor:    cardColor,
            borderTopColor:     'white',
            borderBottomColor:  'white',
            backgroundColor: 'white'
            }}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={[{marginLeft: 10}, commonStyles.detailSubtitle]}>{item.description}</Text>
                </View>
                <View style={commonStyles.center}>
                    <Text style={{fontSize: 30, color: cardColor, marginRight: 10}}>{to2Dp(item.amount)}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={[{marginLeft: 10}, commonStyles.detailDescription]}>{item.currency.code}</Text>
                </View>
                <FlatList
                    horizontal
                    inverted
                    data={item.tags}
                    keyExtractor={(_item, index) => (index).toString()}
                    renderItem = {
                        ({item})=>(
                            <View style={[styles.tagColor, {backgroundColor: item.color, marginRight: 5}]}></View>
                        )
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tagColor: {
        height: 10, 
        width: 10, 
        borderRadius: 5,  
      }
});

export default TransactionCard;
