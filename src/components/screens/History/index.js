import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';

import TransactionCard from '../../transactionCard';
import { removeFromAzure, updateUserNetSav } from './history-logic';
import { Colors, getTransactions } from '../../../utilities/utils';
import RefreshIcon from '../../refreshIcon';

class History extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      deletedRowKey: null,
      refreshing: false,

      transactions: [],
    }
  }

  async componentDidMount() {
    await this.refreshFlatList();
  }

  deleteTransaction = async (index) => {
    this.toggleLoading();
    //get transactions from state
    let ts = this.state.transactions;
    //get uid from transaction to be removed ts[index].uid
    let uid = ts[index].uid;
    //get Amount
    let amt = parseFloat(ts[index].amount);
    //splice array; remove transaction at index
    ts.splice(index, 1);
    //set ts
    await AsyncStorage.setItem("transactions", JSON.stringify(ts));
    //setState
    this.setState({transactions: ts});
    //update user
    await updateUserNetSav(amt);
    //remove from azure using uid
    await removeFromAzure(uid);

    this.toggleLoading();
  }

  refreshFlatList = async () => {
    this.setState({refreshing: true});
    let transactions = await getTransactions();
    this.setState({transactions: transactions, refreshing: false});
  }

  refreshFlatListAfterDelete = (deletedKey) => {
    this.setState(() => {
      return{ deletedRowKey: deletedKey };
    });
  }

  toggleLoading = () => {
    this.setState((prevState) => {
      return{ loading: !prevState.loading };
    });
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
      if(this.state.transactions === [] || this.state.transactions.length < 1){
        return(
          <View style={styles.empty}>
            <Text style={{fontSize: 15}}>You don't seem to have any recent transactions...</Text>
            <RefreshIcon refresh={this.refreshFlatList} size={30}/>
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
                />
              </View>
            }
            refreshing={this.state.refreshing}
            onRefresh={this.refreshFlatList}
            showsVerticalScrollIndicator={false}
          />
        );
      }
    }
  }

  render() {
    return (
      <View styles={[this.state.loading ? styles.loadingStyle : styles.container, {marginTop: 10}]}>
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
    marginTop: 10
  },
  empty: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});

export default History;