import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TransactionCard from '../../components/transaction-card';
import styles from '../../utilities/common-styles';
import { getCurrencyFromCode } from '../../logic/currencies';

class History extends Component {
  render() {
    const { transactions, currency } = this.props;
    return (
      <View styles={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        {transactions.length < 1 &&
          <View style={historyStyles.empty}>
            <Text style={{fontSize: 15}}>You don't seem to have any recent transactions...</Text>
          </View>
        }
        {transactions.length > 0 &&
          <View>
            <FlatList
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              data={transactions}
              keyExtractor={(_item, index) => (index).toString()}
              renderItem={({item, index}) => 
                <View>
                  <TransactionCard 
                    item={item}
                    index={index} 
                    currency={currency}
                  />
                </View>
              }
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

const mapStateToProps = ({user, transactions}) => ({
  currency: getCurrencyFromCode(user.currencyCode),
  transactions
});

export default connect(mapStateToProps)(History);