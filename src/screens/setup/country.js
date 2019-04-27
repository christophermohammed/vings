import React, {Component} from 'react';
import { Text, View, StatusBar, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import MWIDropdown from '../../components/mwi-dropdown';
import { Colors, emptyRegex, countries } from '../../utilities';
import styles from '../../utilities/common-styles';
import { updateUser } from '../../state/user/actions';
import { saveUserToAzure } from '../../logic/cloud';
import { currencyNames, getCurrencyFromName } from '../../logic/currencies';

class Country extends Component {
  constructor(props){
    super(props);

    this.state = {
      country: '',
      currencyName: ''
    }
  }

  save = () => {
    const { country, currencyName } = this.state;
    const { onUpdateUser, navigation, screenProps } = this.props;
    let currency = getCurrencyFromName(currencyName);

    if(emptyRegex.test(String(country))) {
      alert("Please enter a valid country.");
    }else{
      if(currency === undefined){
        alert("Please enter a valid currency.");
      }else{
        let user = {
          ...navigation.getParam('user'),
          currencyCode: currency.code,
          country
        }
        onUpdateUser(user);
        //saveUserToAzure(user);
        screenProps.gotoMain();
      }
    }
  }

  render() {
    const { currencyName, country } = this.state;
    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={styles.space}>
          <Text style={styles.detailTitle}>Currency Info</Text>
        </View>
        <View style={styles.space}>
          <MWIDropdown
            query={country}
            setQuery={(country) => this.setState({country})} 
            data={countries}
            fullData={countries}
            message={"Main country:"}
          />
        </View>
        <View style={styles.space}>
          <MWIDropdown
            query={currencyName}
            setQuery={(currencyName) => this.setState({currencyName})} 
            data={currencyNames}
            fullData={currencyNames}
            message={"Main currency:"}
          />
        </View>
        <View style={[styles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 15, marginLeft: 15}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Go Back"
              onPress={() => this.props.navigation.navigate('Demographic')}
              color={Colors.main}
            />
          </View>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Save"
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

const mapDispatchToProps = {
  onUpdateUser: updateUser 
};

export default connect(null, mapDispatchToProps)(Country);