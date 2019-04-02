import React, {Component} from 'react';
import { ActivityIndicator, View, StatusBar, Button } from 'react-native';
import { SCREEN_WIDTH, Colors, to2Dp, emptyRegex } from '../../utilities/utils';
import { saveTransaction, buildTransaction } from './add-logic';
import { transactionType, placeholders } from '../../utilities/terms';
import MWITextInput from '../../components/mwi-text-input';
import styles from '../../utilities/common-styles';

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
      this.descriptionInput.clear();
      this.amountInput.clear();
      if(this.props.type === transactionType.cost){
        this.locationInput.clear();
      }
    }
  }

  save = async () => {
    // alter UI on save
    this.toggleLoading();
    this.clearTextInputs();
    // extract data 
    const { amount, description, location } = this.state;
    const { type, goHome } = this.props;
    let amt = to2Dp(parseFloat(amount));
    // verify and save
    let transaction = buildTransaction(description, location, amt, type);
    if(transaction){
      await saveTransaction(transaction);
      goHome();
    }
    this.toggleLoading();
  }

  render() {
    const { loading, description, location, amount } = this.state;
    const { type } = this.props;
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
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
              title="Add"
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

export default AddTransaction;