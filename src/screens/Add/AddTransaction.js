import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, TextInput, StyleSheet, Text, View, StatusBar, Button } from 'react-native';

import { Colors } from '../../utilities/utils';
import { SCREEN_WIDTH } from '../../utilities/utils';

const date = new Date().toDateString();

class AddTransaction extends Component {
  constructor(props){
    super(props);

    this.state = {
      description: "",
      location: "",
      amount: "",
      loading: false,

      user: null,
      transaction: null,
      transactions: [],

      dPlaceholder: "Description",
      lPlaceholder: "Location",
    }
  }   
  
  async componentDidMount() {
    await this.updateUser();
    await this.updateTransactions();
  }
  
  updateTransactions = async () => {
    let transactions = await AsyncStorage.getItem("transactions");
    if(transactions !== null){
      this.setState({transactions: JSON.parse(transactions)});
    }
  }

  updateUser = async () => {
    let user = await AsyncStorage.getItem("user");
    if(user !== null){
      this.setState({user: JSON.parse(user)});
    }
  }

  toggleLoading = () => {
    this.setState((prevState) => {
      return{ loading: !prevState.loading };
    });
  }

  clearTextInputs = () => {
    this.setState({amount: ""});
    this.textInput1.clear();
    this.textInput2.clear();
    if(this.props.type === "Cost"){
      this.textInput3.clear();
    }
  }

  addToTransactions = async (transaction) => {
    let transactions = this.state.transactions;
    transactions.unshift(transaction);
    this.setState({transactions: transactions});
    await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
  }   
  
  updateTransactionUID = (uid, transaction) => {
    transaction.uid = uid;
    this.setState({transaction: transaction});
    return transaction;
  }   
  
  saveToAzure = async (transaction) => {
    let user = this.state.user;
    let url = 'https://vingsazure.azurewebsites.net/api/CreateTransaction/';
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            UserUID: user.uid,
            description: transaction.description,
            location: transaction.location,
            amount: transaction.amount,
            date: transaction.date
          }),
      });
      let responseJson = await response.json();
      let fromAzure = JSON.stringify(responseJson);
      let length = fromAzure.length; 
      let uid = (fromAzure.substring(1,length-1));
      return(uid);
    } catch (error) {
      console.error(error);
      return("err");
    }
  }
  
  updateUserNetSav = async (amt) => {
    let user = this.state.user;
    user.netSav += amt;
    this.setState({user: user});
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } 

  safeToSave = (amt) => {
    let clearToSave;
    if(isNaN(amt)){
      clearToSave = false;
    }else{
      clearToSave = true;
    }
    return clearToSave;
  }

  save = async () => {
    this.toggleLoading();
    let amt = parseFloat(this.state.amount);
    await this.updateTransactions();
    await this.updateUser();
    this.clearTextInputs();
    if(this.safeToSave(amt)){
      if(this.props.type === "Cost"){
        amt *= -1;
      }
      let transaction = {
        description: this.state.description,
        location: this.state.location,
        amount: amt.toString(),
        date: date,
        uid: ""
      }
      await this.updateUserNetSav(amt);
      let uid = await this.saveToAzure(transaction);
      let t = this.updateTransactionUID(uid, transaction);
      await this.addToTransactions(t);
      this.props.goHome();
    }else{
      alert("Bad amount entered. Try again.");
      this.clearTextInputs();
    }
    this.toggleLoading();
  }

  renderLoading = () => {
    if(this.state.loading){
      return(
        <ActivityIndicator
          size="large"
          color={Colors.main}
        />
      );
    }
  }

  renderType = () => {
    if(this.props.type === "Cost"){
      return(
        <View style={styles.container}>
          <View style={styles.space}>
            <Text style={styles.question}>What did you buy?</Text>
            <TextInput
              ref={input => { this.textInput1 = input }}
              style={styles.inputStyle}
              onChangeText={(description) => this.setState({description})}
              placeholder={this.state.dPlaceholder}
              clearTextOnFocus={true}
              value={this.state.description}
            />
          </View>
          <View style={styles.space}>
            <Text style={styles.question}>Where did you buy it?</Text>
            <TextInput
              ref={input => { this.textInput2 = input }}
              style={styles.inputStyle}
              onChangeText={(location) => this.setState({location})}
              placeholder={this.state.lPlaceholder}
              clearTextOnFocus={true}
              value={this.state.location}
            />
          </View>
          <View style={styles.space}>
            <Text style={styles.question}>How much did you spend?</Text>
            <TextInput
              ref={input => { this.textInput3 = input }}
              style={styles.inputStyle}
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
              keyboardType="number-pad"
            />
          </View>
        </View>
      );
    }else if(this.props.type === "Savings"){
      return(
        <View style={styles.container}>
          <View style={styles.space}>
            <Text style={styles.question}>How did you come accross this money?</Text>
            <TextInput
              ref={input => { this.textInput1 = input }}
              style={styles.inputStyle}
              placeholder={this.state.dPlaceholder}
              onChangeText={(description) => this.setState({description})}
              clearTextOnFocus={true}
              value={this.state.description}
            />
          </View>
          <View style={styles.space}>
            <Text style={styles.question}>How much did you save?</Text>
            <TextInput
              ref={input => { this.textInput2 = input }}
              style={styles.inputStyle}
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
              keyboardType="number-pad"
            />
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[styles.container, {padding: 10}]}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
          <View style={styles.container}>
            {this.renderType()}
          </View>
          <View style={[styles.space, { borderRadius: 10, width: SCREEN_WIDTH - 20}]}>
            <Button
              title="Add"
              onPress={this.save}
              color={Colors.main}
              disabled={this.state.loading ? true : false }
            />
          </View>
          <View style={styles.loading}>
            {this.renderLoading()}
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    padding: 10
  },
  space: {
    marginTop: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: '400'
  },
  inputStyle: {
    height: 40, 
    width: SCREEN_WIDTH - 20,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 10
  }
});

export default AddTransaction;