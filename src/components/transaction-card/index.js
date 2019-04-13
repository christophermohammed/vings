import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { Colors } from '../../utilities/utils';
import { removeTransaction } from '../../state/transactions/actions';
import { removeFromUserNetSav } from '../../state/user/actions';

class TransactionCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            activeRowKey: null
        };
    }

    render(){
        const { currency, item, index, removeFromUserNetSav, removeTransaction } = this.props;
        amt = item.amount;
        const swipeSettings = {
            autoClose: true,
            onClose: () => {
                this.setState({activeRowKey: null});
            },
            onOpen: () => {
                this.setState({activeRowKey: index});
            },
            right: [
                {
                    onPress: () => {
                        let rowKey = this.state.activeRowKey;
                        removeFromUserNetSav(amt);
                        removeTransaction(rowKey);
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: index,
            sectionId: 1,
        }
        return(
            <Swipeout {...swipeSettings}>
                <View style={[
                        styles.container, 
                        styles.vCommon,
                        {
                            borderWidth: 3,
                            borderRightColor:   'white',
                            borderLeftColor:    (index % 2 === 0) ? Colors.main : 'white',
                            borderTopColor:     'white',
                            borderBottomColor:  'white',
                        }
                    ]}>
                    <View style={[
                        styles.vCommon 
                    ]}>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                        <Text style={styles.descriptionText}>{item.location}</Text>
                        <Text style={styles.descriptionText}>{item.dateString}</Text>
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

const mapDispatchToProps = {
  removeFromUserNetSav,
  removeTransaction 
};
  
export default connect(null, mapDispatchToProps)(TransactionCard);