import React, {Component} from 'react';
import { Text, View, StatusBar, Button, ScrollView } from 'react-native';
import MWITextInput from '../../components/mwi-text-input';
import MWIPicker from '../../components/mwi-picker';
import { Colors, SCREEN_WIDTH, getGUID } from '../../utilities';
import { placeholders } from '../../utilities';
import { genders } from '../../utilities';
import styles from '../../utilities/common-styles';

class Demographic extends Component {
  constructor(props){
    super(props);

    this.state = {
      age: "",
      gender: 'Male',
    }
  }

  next = () => {
    let age = parseInt(this.state.age);
    if(age < 10 || age > 100 || age === NaN || age === undefined) {
      this.clearTextInputs();
      alert("Please enter a valid age.");
    }else{
      let user = {
        age: this.state.age,
        gender: this.state.gender,
        uid: getGUID()
      }
      this.props.navigation.navigate("Country", {user});
    }
  }

  clearTextInputs = () => {
    this.setState({age: ""});
    this.age.clear();
  }

  render() {
    const { age, gender } = this.state;
    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={styles.space}>
          <Text style={styles.detailTitle}>Tell us a little bit about you</Text>
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
            maxLength={3}
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
        <View style={[styles.space, { alignItems: 'flex-end', marginRight: 15}]}>
          <View style={{borderRadius: 10}}>
            <Button
              title="Next"
              onPress={this.next}
              color={Colors.main}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

export default Demographic;