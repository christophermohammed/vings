import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, ActivityIndicator, StatusBar, RefreshControl } from 'react-native';

import TransactionCard from '../../transactionCard';
import { removeTransactionFromAzure } from '../../../utilities/cloud';
import { updateUserNetSav } from './history-logic';
import { Colors } from '../../../utilities/utils';
import { getTransactions, getUser } from '../../../utilities/async';
import VIcon from '../../VIcon';

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
    this.mounted = true;
    await this.refreshFlatList();
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  deleteTransaction = async (index) => {
    this.toggleLoading();
    //get transactions from state
    let ts = this.state.transactions;
    //get uid from transaction to be removed ts[index].uid
    let uid = ts[index].uid;
    //get Amount
    let amt = parseFloat(ts[index].amount);
    //update user
    await updateUserNetSav(amt);
    //remove from azure using uid
    await removeTransactionFromAzure(uid);
    //splice array; remove transaction at index
    ts.splice(index, 1);
    //set ts
    await AsyncStorage.setItem("transactions", JSON.stringify(ts));
    //setState
    if(this.mounted){
      this.setState({transactions: ts});
    }

    this.toggleLoading();
  }

  refreshFlatList = async () => {
    if(this.mounted){
      this.setState({refreshing: true});
      let transactions = await getTransactions();
      let user = await getUser();
      this.setState({transactions: transactions, refreshing: false, currency: user.currency});
    }
  }

  refreshFlatListAfterDelete = (deletedKey) => {
    if(this.mounted){
      this.setState(() => {
        return{ deletedRowKey: deletedKey };
      });
    }
  }

  toggleLoading = () => {
    if(this.mounted){
      this.setState((prevState) => {
        return{ loading: !prevState.loading };
      });
    }
  }

  renderLoading = () => {
    if(this.state.loading){
      return(
        <ActivityIndicator
          size="large"
          color={Colors.main}
        />
      );
    }else{
      if(this.state.transactions === [] || !this.state.transactions.length){
        return(
          <View style={styles.empty}>
            <Text style={{fontSize: 15}}>You don't seem to have any recent transactions...</Text>
            <VIcon action={this.refreshFlatList} size={30} name="ios-refresh"/>
          </View>
        );
      }else{
        return(
          <FlatList
            data={this.state.transactions}
            keyExtractor={(_item, index) => (index).toString()}
            renderItem={({item, index}) => 
              <View>
                <TransactionCard 
                  item={item}
                  index={index} 
                  deleteAction={() => this.deleteTransaction(index)}
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
        );
      }
    }
  }

  render() {
    return (
      <View styles={[this.state.loading ? styles.loadingStyle : styles.container, {marginTop: 10}]}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        {this.renderLoading()}
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