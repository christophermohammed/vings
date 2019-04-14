import React, {Component} from 'react';
import { Text, View, StatusBar, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import MWIDropdown from '../../components/mwi-dropdown';
import { Colors } from '../../utilities/utils';
import styles from '../../utilities/common-styles';
import { updateUser } from '../../state/user/actions';
import { saveUserToAzure } from '../../utilities/cloud';
import { countries } from '../../utilities/data';

class Country extends Component {

  constructor(props){
    super(props);

    this.state = {
      country: '',
      currency: null
    }
  }

  save = () => {
    const { country, currency } = this.state;
    const { onUpdateUser, navigation, screenProps } = this.props;
    if(!(emptyRegex.test(String(country)))) {
      alert("Please enter a valid country.");
    }else{
      if(!(emptyRegex.test(String(currency)))){
        alert("Please enter a valid currency.");
      }else{
        let user = {
          ...navigation.getParam('user'),
          currency,
          country
        }
        onUpdateUser(user);
        saveUserToAzure(user);
        screenProps.gotoMain();
      }
    }
  }

  render() {
    const { currency, country } = this.state;
    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={styles.space}>
          <Text style={styles.welcome}>Currency Info</Text>
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
          <Button
            title="Save"
            onPress={this.save}
            color={Colors.main}
          />
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