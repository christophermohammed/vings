import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Colors } from '../../utilities/utils';

class TransactionCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            activeRowKey: null
        };
    }

    render(){
        const swipeSettings = {
            autoClose: true,
            onClose: () => {
                this.setState({activeRowKey: null});
            },
            onOpen: () => {
                this.setState({activeRowKey: this.props.index});
            },
            right: [
                {
                    onPress: () => {
                        let rowKey = this.state.activeRowKey;
                        this.props.deleteAction(rowKey);
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,
        }
        const amt = this.props.item.amount;
        const { currency } = this.props;
        return(
            <Swipeout {...swipeSettings}>
                <View style={[
                    styles.container, 
                    styles.vCommon,
                    {
                        borderWidth: 3,
                        borderRightColor:   'white',
                        borderLeftColor:    (this.props.index % 2 === 0) ? Colors.main : 'white',
                        borderTopColor:     'white',
                        borderBottomColor:  'white',
                    }
                ]}>
                    <View style={[
                        styles.vCommon 
                    ]}>
                        <Text style={styles.descriptionText}>{this.props.item.description}</Text>
                        <Text style={styles.descriptionText}>{this.props.item.location}</Text>
                        <Text style={styles.descriptionText}>{this.props.item.date}</Text>
                    </View>
                    <View style={[
                        styles.amount, 
                        styles.vCommon,
                    ]}>
                        <Text 
                            style={
                                (amt < 0) 
                                ? [styles.amountText, {color: Colors.red}] 
                                : [styles.amountText, {color: Colors.green}]}
                        >
                            {
                                (amt < 0) 
                                ? `-${currency}${(Math.round(amt * 100) / 100) * -1}` 
                                : `${currency}${Math.round(amt * 100) / 100}`
                            }
                        </Text>
                    </View>
                </View>
            </Swipeout>
        );
    }
} 

const styles = StyleSheet.create({
    vCommon: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    descriptionText: {
        fontSize: 18
    },
    amountText: {
        fontSize: 30
    },
    container: {
        flexDirection: 'row',
    },
    amount: {
        alignItems: 'center'
    }
});

export default TransactionCard;