import React, {Component} from 'react';
import { ActivityIndicator, TextInput, StyleSheet, Text, View, StatusBar, Button } from 'react-native';

import { SCREEN_WIDTH, Colors, to2Dp } from '../../../utilities/utils';
import { safeToSave, saveTransaction } from './add-logic';

const date = new Date().toDateString();

class AddTransaction extends Component {
  constructor(props){
    super(props);

    this.state = {
      description: "",
      location: "",
      amount: "",
      loading: false,

      dPlaceholder: "\tDescription",
      lPlaceholder: "\tLocation",
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

  save = async () => {
    //alter UI on save
    this.toggleLoading();
    this.clearTextInputs();
    let amt = to2Dp(parseFloat(this.state.amount));
    if(safeToSave(amt)){
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
      await saveTransaction(transaction);
      this.props.goHome();
    }else{
      alert("Invalid amount entered. Try again.");
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