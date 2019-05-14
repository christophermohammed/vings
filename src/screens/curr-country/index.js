import React, {Component} from 'react';
import { Text, View, StatusBar, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import MWIDropdown from '../../components/mwi-dropdown';
import { Colors, emptyRegex, countries } from '../../utilities';
import commonStyles from '../../utilities/common-styles';
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
    const { onUpdateUser, user, screenProps, goBack, isSetup } = this.props;
    let currency = getCurrencyFromName(currencyName);

    if(emptyRegex.test(String(country))) {
      alert("Please enter a valid country.");
    }else{
      if(currency === undefined){
        alert("Please enter a valid currency.");
      }else{
        let newUser = {
          ...user,
          currencyCode: currency.code,
          country
        }
        onUpdateUser(newUser);
        //saveUserToAzure(user);
        if(isSetup){
          screenProps.gotoMain();
        }else{
          goBack();
        }
      }
    }
  }

  render() {
    const { currencyName, country } = this.state;
    const { goBack, isSetup } = this.props;
    return (
      <ScrollView>
      <View style={commonStyles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={commonStyles.space}>
          <Text style={commonStyles.detailTitle}>Currency Info</Text>
        </View>
        <View style={commonStyles.space}>
          <MWIDropdown
            query={country}
            setQuery={(country) => this.setState({country})} 
            data={countries}
            fullData={countries}
            message={"Main country:"}
          />
        </View>
        <View style={commonStyles.space}>
          <MWIDropdown
            query={currencyName}
            setQuery={(currencyName) => this.setState({currencyName})} 
            data={currencyNames}
            fullData={currencyNames}
            message={"Main currency:"}
          />
        </View>
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Back"
              onPress={goBack}
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