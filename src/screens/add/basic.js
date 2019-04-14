import React, {Component} from 'react';
import { ScrollView, View, StatusBar, Button } from 'react-native';
import { SCREEN_WIDTH, Colors, to2Dp } from '../../utilities';
import { buildTransaction } from './add-logic';
import { transactionType, placeholders } from '../../utilities';
import MWITextInput from '../../components/mwi-text-input';
import styles from '../../utilities/common-styles';
import { saveTransactionToAzure } from '../../utilities/cloud';

class Basic extends Component {
  constructor(props){
    super(props);

    this.state = {
      description: "",
      location: "",
      amount: "",
    }
  }   

  clearTextInputs = () => {
    this.setState({amount: ""});
    this.descriptionInput.clear();
    this.amountInput.clear();
    if(this.props.type === transactionType.cost){
      this.locationInput.clear();
    }
  }

  next = () => {
    // alter UI on save
    this.clearTextInputs();
    // extract data 
    const { amount, description, location } = this.state;
    const { type, navigation, addToUserNetSav, addTransaction, user } = this.props;
    let amt = to2Dp(parseFloat(amount));
    // verify and save
    let transaction = buildTransaction(description, location, amt, type);
    if(transaction){
      navigation.navigate('More', {transaction});
    }
  }

  render() {
    const { description, location, amount, currency } = this.state;
    const { type } = this.props;
    return (
      <ScrollView>
      <View style={[styles.container, styles.center]}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={styles.space}>
          <MWITextInput 
            message={type === transactionType.cost ? "What did you buy?" : "How did you come across this money?"}
            placeholder={placeholders.description}
            value={description}
            onChange={description => this.setState({description})}
            getRef={desc => { this.descriptionInput = desc }}
            width={SCREEN_WIDTH - 20}
          />
        </View>
        <View style={styles.space}>
          <MWITextInput
            message={`How much did you ${type === transactionType.cost ? "spend" : "save"}?`} 
            getRef={amt => { this.amountInput = amt }}
            onChange={amount => this.setState({amount})}
            placeholder={placeholders.amount}
            value={amount}
            keyboardType="decimal-pad"
            width={SCREEN_WIDTH - 20}
          />
        </View>
        {type === transactionType.cost ? (
            <View style={styles.space}>
              <MWITextInput
                message="Where did you buy it?" 
                getRef={loc => { this.locationInput = loc }}
                onChange={location => this.setState({location})}
                placeholder={placeholders.location}
                value={location}
                width={SCREEN_WIDTH - 20}
                textContentType="location"
              />
            </View>
        ) : null }
        <View style={[styles.space, { borderRadius: 10, width: SCREEN_WIDTH - 20}]}>
          <Button
            title="Next"
            onPress={this.next}
            color={Colors.main}
          />
        </View>
      </View>
      </ScrollView>
    );
  }
}

export default Basic;