import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StatusBar, Button } from 'react-native';
import { SCREEN_WIDTH, Colors, to2Dp } from '../../utilities/utils';
import { buildTransaction } from './add-logic';
import { transactionType, placeholders } from '../../utilities/data';
import MWITextInput from '../../components/mwi-text-input';
import MWIPicker from '../../components/mwi-picker';
import styles from '../../utilities/common-styles';
import { addToUserNetSav } from '../../state/user/actions';
import { addTransaction } from '../../state/transactions/actions';
import { saveTransactionToAzure } from '../../utilities/cloud';

class AddTransaction extends Component {
  constructor(props){
    super(props);

    this.mounted = false;

    this.state = {
      description: "",
      location: "",
      amount: "",
      currency: ""
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

  save = () => {
    // alter UI on save
    this.clearTextInputs();
    // extract data 
    const { amount, description, location, currency } = this.state;
    const { type, goHome, addToUserNetSav, addTransaction, user } = this.props;
    let amt = to2Dp(parseFloat(amount));
    // verify and save
    let transaction = buildTransaction(description, location, amt, currency, type);
    if(transaction){
      //saveTransactionToAzure(transaction, user.uid);
      addTransaction(transaction);
      addToUserNetSav(transaction.amount);
      goHome();
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
        <View style={[styles.space, {width: SCREEN_WIDTH}]}>
          <MWIPicker 
            items={[]}
            selectedValue={currency}
            onChange={(currency) => this.setState({currency})}
            message={`What currency did you ${type === transactionType.cost ? "spend" : "save"}?`}
          />
        </View>
        <View style={[styles.space, { borderRadius: 10, width: SCREEN_WIDTH - 20}]}>
          <Button
            title="Add"
            onPress={this.save}
            color={Colors.main}
          />
        </View>
      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = {
  addToUserNetSav,
  addTransaction 
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);