import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import TransactionCard from '../../components/transaction-card';
import { Colors } from '../../utilities/utils';
import VIcon from '../../components/v-icon';
import styles from '../../utilities/common-styles';
import { removeFromUserNetSav } from '../../state/user/actions';
import { removeTransaction } from '../../state/transactions/actions';

class History extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      deletedRowKey: null,
    }
  }

  // refreshFlatListAfterDelete = (deletedRowKey) => {
  //   this.setState({deletedRowKey});
  // }

  render() {
    const { loading } = this.state;
    const { transactions, currency } = this.props;
    return (
      <View styles={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        {loading &&
          <View style={historyStyles.loadingStyle}>
            <ActivityIndicator
              size="large"
              color={Colors.main}
            />
          </View>
        }
        {(transactions === []) &&
          <View style={historyStyles.empty}>
            <Text style={{fontSize: 15}}>You don't seem to have any recent transactions...</Text>
          </View>
        }
        {!loading && transactions !== [] &&
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.transactions}
              keyExtractor={(_item, index) => (index).toString()}
              renderItem={({item, index}) => 
                <View>
                  <TransactionCard 
                    item={item}
                    index={index} 
                    deleteAction={() => removeTransaction(index)}
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
  loadingStyle: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  empty: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});

const mapStateToProps = ({user, transactions}) => ({
  currency: user.currency,
  transactions
});

const mapDispatchToProps = {
  removeFromUserNetSav,
  removeTransaction 
};

export default connect(mapStateToProps, mapDispatchToProps)(History);