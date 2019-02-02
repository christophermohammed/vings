import React, {Component} from 'react';
import { AsyncStorage, ActivityIndicator, StyleSheet, Text, View, StatusBar, TextInput, Platform, Picker, Button } from 'react-native';

import { Colors } from '../utilities/utils';
import { SCREEN_WIDTH } from '../utilities/utils';

const genders = ["Male", "Female" , "Non-Binary"];

export default class Settings extends Component {

  constructor(props){
    super(props);
    this.state = {
        age: "",
        gender: "",
        items: [],
        selectedItem: "Male",
        loading: false
    }
  }

  componentDidMount(){
    this.setState({
        items: genders
    });
  }

  toggleLoading = () => {
    this.setState((prevState) => {
      return{loading: !prevState.loading}
    });
  }

  saveUserToAzure = async (user) => {
    let url = 'https://vingsazure.azurewebsites.net/api/CreateUser/';
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: user.age,
          gender: user.gender
          }),
      });
      let responseJson = await response.json();
      let fromAzure = JSON.stringify(responseJson);
      let length = fromAzure.length; 
      let uid = fromAzure.substring(1,length-1);
      return(uid);
    } catch (error) {
      console.error(error);
      return("err");
    }
  }

  save = async () => {
    this.toggleLoading();
    let user = {
      age: this.state.age,
      gender: this.state.selectedItem,
      netSav: 0.0,
      uid: ""
    }
    let uid = await this.saveUserToAzure(user);
    user.uid = uid;
    debugger;
    await AsyncStorage.setItem("user", JSON.stringify(user));
    this.toggleLoading();
    this.props.navigation.navigate("Vings");
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
            style={styles.inputStyle}
            onChangeText={(age) => this.setState({age})}
            value={this.state.age}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.space}>
          <Text style={styles.question}>What is your gender?</Text>
          <View style={{alignItems: 'center'}}>
            <Picker
                selectedValue={this.state.selectedItem}
                onValueChange={
                    (itemValue) => {
                        this.setState({selectedItem: itemValue}) 
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
    width: SCREEN_WIDTH - 150,
    height: Platform.OS === 'ios' ? 165 : 40,
    marginTop: Platform.OS === 'ios' ? -20 : 0
  }
});