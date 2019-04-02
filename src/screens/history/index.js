import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, StatusBar, RefreshControl } from 'react-native';

import TransactionCard from '../../components/transaction-card';
import { Colors } from '../../utilities/utils';
import { getTransactions, getUser } from '../../utilities/async';
import VIcon from '../../components/v-icon';
import { deleteTransaction } from './history-logic';

class History extends Component {
  
  constructor(props){
    super(props);

    this.mounted = false;

    this.state = {
      loading: false,
      deletedRowKey: null,
      refreshing: false,

      currency: "",
      transactions: [],
    }
  }

  async componentDidMount() {
    await this.refreshFlatList();
  }

  delete = async (index) => {
    await deleteTransaction(index, this.state.transactions, this.setTransactions, this.toggleLoading);
  }

  refreshFlatList = async () => {
    this.setState({refreshing: true});
    let transactions = await getTransactions();
    let user = await getUser();
    this.setState({transactions, refreshing: false, currency: user.currency});
  }

  refreshFlatListAfterDelete = (deletedRowKey) => {
    this.setState(() => {
      return{ deletedRowKey };
    });
  }

  toggleLoading = () => {
    this.setState((prevState) => {
      return{ loading: !prevState.loading };
    });
  }

  setTransactions = (transactions) => {
    this.setState({transactions});
  }

  render() {
    const { loading, transactions } = this.state;
    return (
      <View styles={[styles.container, {marginTop: 10}]}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        {loading &&
          <View style={styles.loadingStyle}>
              <ActivityIndicator
                size="large"
                color={Colors.main}
              />
          </View>
        }
        {(transactions === []) &&
          <View style={styles.empty}>
            <Text style={{fontSize: 15}}>You don't seem to have any recent transactions...</Text>
            <VIcon action={this.refreshFlatList} size={30} name="ios-refresh"/>
          </View>
        }
        {!loading && transactions !== [] &&
          <View>
            <FlatList
              data={this.state.transactions}
              keyExtractor={(_item, index) => (index).toString()}
              renderItem={({item, index}) => 
                <View>
                  <TransactionCard 
                    item={item}
                    index={index} 
                    deleteAction={() => this.delete(index)}
                    refresh={this.refreshFlatListAfterDelete}
                    currency={this.state.currency}
                  />
                </View>
              }
              refreshControl = {
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refreshFlatList}
                  colors={[Colors.main]}
                  progressBackgroundColor="white"
                  tintColor={Colors.main}
                  title="Pull to refresh"
                />
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 10
  },
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

export default History;