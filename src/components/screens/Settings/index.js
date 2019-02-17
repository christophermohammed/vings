import React, {Component} from 'react';
import { AsyncStorage, ActivityIndicator, StyleSheet, Text, View, StatusBar, TextInput, Platform, Picker, Button } from 'react-native';

import { Colors, SCREEN_WIDTH } from '../../../utilities/utils';
import { saveUser } from './settings-logic';
import { placeholders } from '../../../utilities/terms';

const genders = ["Male", "Female" , "Non-Binary"];

export default class Settings extends Component {

  constructor(props){
    super(props);

    this.mounted = false;

    this.state = {
        age: "",
        items: [],
        gender: "Male",
        loading: false,
    }
  }

  componentDidMount(){
    this.mounted = true;
    this.setState({
        items: genders
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  toggleLoading = () => {
    if(this.mounted){
      this.setState((prevState) => {
        return{loading: !prevState.loading}
      });
    }
  }

  save = async () => {
    this.toggleLoading();
    let age = parseInt(this.state.age);
    if(age < 10 || age > 100 || age === NaN) {
      this.clearTextInputs();
      this.toggleLoading();
      alert("Please enter a valid age.");
    }else{
      let user = {
        age: this.state.age,
        gender: this.state.gender,
        netSav: 0.0,
        uid: ""
      }
      await saveUser(user);
      this.toggleLoading();
      this.props.navigation.navigate("Vings");
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
    }
  }

  clearTextInputs = () => {
    if(this.mounted){
      this.setState({age: ""});
      this.textInput1.clear();
    }
  }

  render() {
    let itemList = this.state.items.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Text style={styles.welcome}>Tell us a little bit about you</Text>
        <View style={styles.space}>
          <Text style={styles.question}>How old are you?</Text>
          <TextInput
            ref={input => { this.textInput1 = input }}
            style={styles.inputStyle}
            onChangeText={(age) => this.setState({age})}
            value={this.state.age}
            keyboardType="number-pad"
            placeholder={placeholders.age}
          />
        </View>
        <View style={styles.space}>
          <Text style={styles.question}>What is your gender?</Text>
          <View style={{alignItems: 'center'}}>
            <Picker
                selectedValue={this.state.gender}
                onValueChange={
                    (itemValue) => {
                        this.setState({gender: itemValue}) 
                    }
                }
                style={styles.VingsPickerStyle}
            >
                {itemList}
            </Picker>
          </View>
        </View>
        <View style={[styles.space, {marginTop: Platform.OS === 'ios' ? 30 : 0}]}>
          <Button
            title="Save"
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
    padding: 10,
    backgroundColor: 'white'
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
  welcome: {
    fontSize: 26,
    fontWeight: '600'
  },
  inputStyle: {
    height: 40, 
    width: SCREEN_WIDTH - 20,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 10
  },
  VingsPickerStyle: {
    width: Platform.OS === 'ios' ? SCREEN_WIDTH - 150 : SCREEN_WIDTH,
    height: Platform.OS === 'ios' ? 165 : 40,
    marginTop: Platform.OS === 'ios' ? -20 : 0
  }
});