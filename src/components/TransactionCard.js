import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Swipeout from 'react-native-swipeout';

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
            onClose: (secId, rowId, direction) => {
                this.setState({activeRowKey: null});
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.index});
            },
            right: [
                {
                    onPress: () => {
                        let rowKey = this.state.activeRowKey;
                        this.props.deleteAction(rowKey);
                        this.props.refresh(rowKey);
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,
        }
    
        return(
            <Swipeout {...swipeSettings}>
                <View style={[styles.container, styles.vCommon]}>
                    <View style={[styles.description, styles.vCommon]}>
                        <Text style={styles.descriptionText}>{this.props.item.description}</Text>
                        <Text style={styles.descriptionText}>{this.props.item.location}</Text>
                        <Text style={styles.descriptionText}>{this.props.item.date}</Text>
                    </View>
                    <View style={[styles.amount, styles.vCommon]}>
                        <Text style={styles.amountText}>{this.props.item.amount}</Text>
                    </View>
                </View>
            </Swipeout>
        );
    }
} 

const styles = StyleSheet.create({
    vCommon: {
        flex: 1,
        padding: 10
    },
    descriptionText: {
        fontSize: 20
    },
    amountText: {
        fontSize: 40
    },
    container: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRightColor:   'white',
        borderLeftColor:    'white',
        borderTopColor:     '#4a69bd',
        borderBottomColor:  'white',
    },
    description: {
    },
    amount: {
        alignItems: 'center'
    }
});

export default TransactionCard;