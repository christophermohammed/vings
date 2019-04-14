import React, { Component } from 'react';
import { View, StatusBar, ScrollView, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { currencies } from '../../utilities/data';
import { updateCurrency } from '../../state/user/actions';
import MWIPicker from '../../components/mwi-picker';
import styles from '../../utilities/common-styles';
import { Colors } from '../../utilities/utils';
import Profile from '../../components/profile';

class Settings extends Component {
    constructor(props){
      super(props);

      this.state = {
        currency: '$',
      }
    }

    render() {
      const { updateCurrency, user } = this.props;
      const { currency } = this.state;
      return (
        <ScrollView>
          <View>
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
            />
            <View style={styles.space}>
              <Profile user={user}/>
            </View>
            <View style={styles.space}>
                <Text style={styles.welcome}>Edit</Text>
            </View>
            <View style={styles.space}>
              <MWIPicker 
                items={currencies}
                selectedValue={currency}
                onChange={(currency) => this.setState({currency})}
                message="What's your main currency?"
              />
            </View>
            <View style={styles.space}>
              <Button
                title="Save"
                onPress={() => updateCurrency(this.state.currency)}
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
  updateCurrency 
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);