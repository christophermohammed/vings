import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { connect } from 'react-redux';
import MWITextInput from '../../components/mwi-text-input';
import MWIPicker from '../../components/mwi-picker';
import { Colors, SCREEN_WIDTH, getGUID } from '../../utilities/utils';
import { placeholders } from '../../utilities/terms';
import { genders, currencies } from '../../data/utils';
import styles from '../../utilities/common-styles';
import { updateUser } from '../../state/user/actions';

class Settings extends Component {

  constructor(props){
    super(props);

    this.state = {
      age: "",
      genders: [],
      gender: 'Male',
      currencies: [],
      currency: '$',
      loading: false
    }
  }

  componentDidMount(){
    this.setState({genders, currencies});
  }

  toggleLoading = () => {
    this.setState((prevState) => {
      return{loading: !prevState.loading}
    });
  }

  save = () => {
    this.toggleLoading();
    let age = parseInt(this.state.age);
    if(age < 10 || age > 100 || age === NaN || age === undefined) {
      this.clearTextInputs();
      alert("Please enter a valid age.");
    }else{
      let user = {
        age: this.state.age,
        gender: this.state.gender,
        netSav: 0.0,
        currency: this.state.currency,
        uid: getGUID()
      }
      this.props.onUpdateUser(user);
      this.props.navigation.navigate("Vings");
    }
    this.toggleLoading();
  }

  clearTextInputs = () => {
    this.setState({age: ""});
    this.age.clear();
  }

  render() {
    const { loading, genders, currencies, age, gender, currency } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={styles.space}>
          <Text style={settingsStyles.welcome}>Tell us a little bit about you</Text>
        </View>
        <View style={styles.space}>
          <MWITextInput 
            message="How old are you?"
            value={age}
            onChange={(age) => this.setState({age})}
            getRef={(age) => this.age = age}
            width={(SCREEN_WIDTH - 20)} 
            keyboardType="number-pad"
            placeholder={placeholders.age}
          />
        </View>
        <View style={styles.space}>
          <MWIPicker 
            items={genders}
            selectedValue={gender}
            onChange={(gender) => this.setState({gender})}
            message="What is your gender?"
          />
        </View>
        <View style={styles.space}>
          <MWIPicker 
            items={currencies}
            selectedValue={currency}
            onChange={(currency) => this.setState({currency})}
            message="What is your preferred currency?"
          />
        </View>
        <View style={styles.space}>
          <Button
            title="Save"
            onPress={this.save}
            color={Colors.main}
            disabled={loading}
          />
        </View>
        {loading &&
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color={Colors.main}
            />
          </View>
        }
      </View>
    );
  }
}

const settingsStyles = StyleSheet.create({
  welcome: {
    fontSize: 26,
    fontWeight: '600'
  },
});

const mapDispatchToProps = {
  onUpdateUser: updateUser 
};

export default connect(null, mapDispatchToProps)(Settings);