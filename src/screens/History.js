import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';

import TransactionCard from './../components/TransactionCard';
import Colors from '../utilities/colors';

class History extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      deletedRowKey: null,
      refreshing: false,

      user: null,
      transactions: [],
      marginTop: 0
    }
  }

  async componentDidMount() {
    let user = await AsyncStorage.getItem("user");
    this.setState({user: JSON.parse(user)});
    await this.refreshFlatList();
  }

  removeFromAzure = async (uid) => {
    let user = this.state.user;
    let url = 'https://vingsazure.azurewebsites.net/api/RemoveTransaction/';
    try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserUID: user.uid,
            transactionUID: uid 
            }),
        });
        let resJson = await response.json();
      } catch (error) {
        console.error(error);
    }
    this.toggleLoading();
  }

  updateUserNetSav = async (amt) => {
    let user = this.state.user;
    user.netSav -= amt;
    this.setState({user: user}, () => {
      AsyncStorage.setItem("user", JSON.stringify(user));
    });
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
    await this.updateUserNetSav(amt);
    //remove from azure using uid
    await this.removeFromAzure(uid);
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
      if(this.state.transactions === null || this.state.transactions.length < 1){
        return(
          <View style={styles.empty}>
            <Text style={{fontSize: 18}}>You don't seem to have any recent transactions...</Text>
            <Button 
              title="Refresh"
              onPress={this.refreshFlatList}
              color={Colors.main}
            />
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

  updateTransactions = async () => {
    let transactions = await AsyncStorage.getItem("transactions");
    this.setState({transactions: JSON.parse(transactions)});
  }

  refreshFlatList = async () => {
    this.setState({refreshing: true});
    await this.updateTransactions();
    this.setState({refreshing: false});
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