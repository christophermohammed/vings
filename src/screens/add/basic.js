import React, {Component} from 'react';
import { ScrollView, View, StatusBar, Button, Text } from 'react-native';
import { SCREEN_WIDTH, Colors, to2Dp } from '../../utilities';
import { buildBasicTransaction } from '../../logic/add';
import { transactionType, placeholders } from '../../utilities';
import MWITextInput from '../../components/mwi-text-input';
import styles from '../../utilities/common-styles';

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
    if(this.props.screenProps.type === transactionType.cost){
      this.locationInput.clear();
    }
  }

  next = () => {
    // alter UI on save
    this.clearTextInputs();
    // extract data 
    const { amount, description, location } = this.state;
    const { screenProps, navigation } = this.props;
    let amt = to2Dp(parseFloat(amount));
    // verify and save
    let transaction = buildBasicTransaction(description, location, amt, screenProps.type);
    if(transaction){
      navigation.navigate('More', {transaction});
    }
  }

  render() {
    const { description, location, amount } = this.state;
    const { screenProps } = this.props;
    let type = screenProps.type;
    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={styles.space}>
          <Text style={styles.detailTitle}>Basic info</Text>
        </View>
        <View style={[styles.space, styles.center]}>
          <MWITextInput 
            message={type === transactionType.cost ? "What did you buy?" : "How did you come across this money?"}
            placeholder={placeholders.description}
            value={description}
            onChange={description => this.setState({description})}
            getRef={desc => { this.descriptionInput = desc }}
            width={SCREEN_WIDTH - 20}
            maxLength={50}
          />
        </View>
        <View style={[styles.space, styles.center]}>
          <MWITextInput
            message={`How much did you ${type === transactionType.cost ? "spend" : "save"}?`} 
            getRef={amt => { this.amountInput = amt }}
            onChange={amount => this.setState({amount})}
            placeholder={placeholders.amount}
            value={amount}
            keyboardType="decimal-pad"
            width={SCREEN_WIDTH - 20}
            maxLength={12}
          />
        </View>
        {type === transactionType.cost ? (
            <View style={[styles.space, styles.center]}>
              <MWITextInput
                message="Where did you buy it?" 
                getRef={loc => { this.locationInput = loc }}
                onChange={location => this.setState({location})}
                placeholder={placeholders.location}
                value={location}
                width={SCREEN_WIDTH - 20}
                textContentType="location"
                maxLength={50}
              />
            </View>
        ) : null }
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

export default Basic;