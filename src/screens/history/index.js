import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SwipeCard from '../../components/transactions-card/swipeable-card';
import TransactionCard from '../../components/transactions-card';
import styles from '../../utilities/common-styles';
import { removeTransaction } from '../../state/transactions/actions';
import { removeFromNetSav } from '../../state/currencies/actions';

class History extends Component {
  constructor(props){
    super(props);

    this.state = {
      localTransactions: []
    };
  }

  componentDidMount(){
    this.setState({localTransactions: this.props.transactions.slice(0, 100)});
  }

  componentDidUpdate(){
    const { localTransactions } = this.state;
    const { transactions } = this.props;
    let i = Math.ceil(localTransactions.length / 100);
    let visibleTransactions = transactions.slice(0, i * 100);
    if(localTransactions.length !== visibleTransactions.length){
      this.setState({localTransactions: visibleTransactions});
    }
  }

  render() {
    const { transactions, removeFromNetSav, removeTransaction, navigation } = this.props;
    const { localTransactions } = this.state;
    return (
      <View styles={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        {localTransactions.length < 1 &&
          <View style={historyStyles.empty}>
            <Text style={{fontSize: 15}}>You don't seem to have any transactions...</Text>
          </View>
        }
        {localTransactions.length > 0 &&
          <View>
            <FlatList
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              data={localTransactions}
              keyExtractor={(_item, index) => (index).toString()}
              renderItem={({item, index}) => 
                <View>
                  <SwipeCard 
                    item={item}
                    index={index} 
                    remove={(transaction, rowKey) => {
                      removeFromNetSav(transaction.amount, transaction.currency);
                      removeTransaction(rowKey);
                    }}
                    renderCard={item => (
                      <TouchableOpacity onPress={() => navigation.navigate('Edit', { transaction: localTransactions[index] })}>
                        <TransactionCard 
                          item={item}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              }
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                var i = Math.ceil(localTransactions.length / 100);
                i++;
                this.setState({localTransactions: transactions.slice(0, i * 100)});
              }}
            />
          </View>
        }
      </View>
    );
  }
}

const historyStyles = StyleSheet.create({
  empty: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});

const mapStateToProps = ({transactions}) => ({
  transactions
});

const mapDispatchToProps = {
  removeFromNetSav,
  removeTransaction 
};

export default connect(mapStateToProps, mapDispatchToProps)(History);