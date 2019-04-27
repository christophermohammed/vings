import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
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
      localTransactions: props.transactions.slice(0, 100)
    };
  }

  render() {
    const { transactions, removeFromNetSav, removeTransaction } = this.props;
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
                      this.setState({localTransactions: localTransactions.length === 1 ? [] : localTransactions.splice(rowKey, 1)});
                    }}
                    renderCard={item => (
                      <TransactionCard 
                        item={item}
                      />
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