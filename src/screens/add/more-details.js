import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StatusBar, Button } from 'react-native';
import MWIDropdown from '../../components/mwi-dropdown';
import { Colors, transactionType } from '../../utilities';
import { currencyNames, getCurrencyFromName, convertCurrency } from '../../utilities/currencies';
import styles from '../../utilities/common-styles';
import { addToUserNetSav } from '../../state/user/actions';
import { addTransaction } from '../../state/transactions/actions';
import { saveTransactionToAzure } from '../../utilities/cloud';

class More extends Component {
  constructor(props){
    super(props);

    this.state = {
      currencyName: ""
    }
  }   

  save = () => {
    // extract data 
    const { currencyName } = this.state;
    const { screenProps, addToUserNetSav, addTransaction, navigation, user } = this.props;
    // verify and save
    let date = new Date();
    let currency = getCurrencyFromName(currencyName);
    let transaction = navigation.getParam('transaction');
    let localAmount = convertCurrency(transaction.amount, currency.rate, user.currency.rate);

    let updatedTransaction = {
      ...transaction,
      localAmount,
      currency,
      date,
      dateString: date.toDateString()
    };
    if(transaction){
      //saveTransactionToAzure(transaction, user.uid);
      addTransaction(updatedTransaction);
      // addToUserNetSav(updatedTransaction.localAmount);
      navigation.navigate('Basic');
      screenProps.goHome();
    }
  }

  render() {
    const { currencyName } = this.state;
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
          <MWIDropdown
            query={currencyName}
            setQuery={(currencyName) => this.setState({currencyName})} 
            data={currencyNames}
            fullData={currencyNames}
            message={`What currency did you ${type === transactionType.cost ? "spend" : "save"}?`}
          />
        </View>
        <View style={[styles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 15, marginLeft: 15}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Go Back"
              onPress={() => this.props.navigation.navigate('Basic')}
              color={Colors.main}
            />
          </View>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Add"
              onPress={this.save}
              color={Colors.main}
            />
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(More);