import React, {Component} from 'react';
import { ActivityIndicator, TextInput, StyleSheet, Text, View, StatusBar, Button } from 'react-native';

import { SCREEN_WIDTH, Colors, to2Dp } from '../../../utilities/utils';
import { amtSafeToSave, desSafeToSave, locSafeToSave, saveTransaction } from './add-logic';
import { transactionType, placeholders } from '../../../utilities/terms';

const date = new Date().toDateString();

class AddTransaction extends Component {
  constructor(props){
    super(props);

    this.mounted = false;

    this.state = {
      description: "",
      location: "",
      amount: "",
      loading: false,
    }
  }   
  
  componentDidMount(){
    this.mounted = true;
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  toggleLoading = () => {
    if(this.mounted){
      this.setState((prevState) => {
        return{ loading: !prevState.loading };
      });
    }
  }

  clearTextInputs = () => {
    if(this.mounted){
      this.setState({amount: ""});
      this.textInput1.clear();
      this.textInput2.clear();
      if(this.props.type === transactionType.cost){
      this.textInput3.clear();
      }
    }
  }

  save = async () => {
    //alter UI on save
    this.toggleLoading();
    this.clearTextInputs();
    let { amount, description, location } = this.state;
    let amt = to2Dp(parseFloat(amount));
    if(amtSafeToSave(amt)){
      if(desSafeToSave(description)){
        if (locSafeToSave(location, this.props.type)) {
          if(this.props.type === transactionType.cost){
            amt *= -1;
          }
          let transaction = {
            description: description,
            location: location,
            amount: amt.toString(),
            date: date,
            uid: ""
          }
          await saveTransaction(transaction);
          this.props.goHome();
        } else {
          alert("Please enter a valid location.");
        }
      }else{
        alert("Please enter a valid description.");
      }
    }else{
      alert("Please enter a valid amount.");
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
    if(this.props.type === transactionType.cost){
      return(
        <View style={styles.container}>
          <View style={styles.space}>
            <Text style={styles.question}>What did you buy?</Text>
            <TextInput
              ref={input => { this.textInput1 = input }}
              style={styles.inputStyle}
              onChangeText={(description) => this.setState({description})}
              placeholder={placeholders.description}
              clearTextOnFocus={true}
              value={this.state.description}
              returnKeyType="done"
            />
          </View>
          <View style={styles.space}>
            <Text style={styles.question}>Where did you buy it?</Text>
            <TextInput
              ref={input => { this.textInput2 = input }}
              style={styles.inputStyle}
              onChangeText={(location) => this.setState({location})}
              placeholder={placeholders.location}
              clearTextOnFocus={true}
              value={this.state.location}
              returnKeyType="done"
            />
          </View>
          <View style={styles.space}>
            <Text style={styles.question}>How much did you spend?</Text>
            <TextInput
              ref={input => { this.textInput3 = input }}
              style={styles.inputStyle}
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>
        </View>
      );
    }else if(this.props.type === transactionType.savings){
      return(
        <View style={styles.container}>
          <View style={styles.space}>
            <Text style={styles.question}>How did you come across this money?</Text>
            <TextInput
              ref={input => { this.textInput1 = input }}
              style={styles.inputStyle}
              placeholder={placeholders.description}
              onChangeText={(description) => this.setState({description})}
              clearTextOnFocus={true}
              value={this.state.description}
              returnKeyType="done"
            />
          </View>
          <View style={styles.space}>
            <Text style={styles.question}>How much did you save?</Text>
            <TextInput
              ref={input => { this.textInput2 = input }}
              style={styles.inputStyle}
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
              keyboardType="decimal-pad"
              returnKeyType="done"
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