import React, { Component } from 'react';
import { View, StatusBar, ScrollView, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { updateCurrencyCode } from '../../state/user/actions';
import MWIDropdown from '../../components/mwi-dropdown';
import styles from '../../utilities/common-styles';
import { Colors } from '../../utilities';
import Profile from '../../components/profile';
import {currencyNames, getCurrencyFromName, getCurrencyFromCode} from '../../logic/currencies';

class Settings extends Component {
    constructor(props){
      super(props);

      this.state = {
        currencyName: '',
      }
    }

    render() {
      const { updateCurrencyCode, user } = this.props;
      const { currencyName } = this.state;
      return (
        <ScrollView>
          <View>
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
            />
            <View style={styles.space}>
              <Profile user={user} currencyName={currencyName}/>
            </View>
            <View style={styles.space}>
                <Text style={styles.detailTitle}>Edit</Text>
            </View>
            <View style={styles.space}>
              <MWIDropdown
                query={currencyName}
                setQuery={(currencyName) => this.setState({currencyName})} 
                data={currencyNames}
                fullData={currencyNames}
                message="Change your main currency"
              />
            </View>
            <View style={styles.space}>
              <Button
                title="Save"
                onPress={() => {
                  let code = getCurrencyFromName(currencyName).code;
                  updateCurrencyCode(code);
                  this.props.navigation.navigate('Home');
                }}
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
  updateCurrencyCode 
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);