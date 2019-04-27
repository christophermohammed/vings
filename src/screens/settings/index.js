import React, { Component } from 'react';
import { View, StatusBar, ScrollView, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../utilities/common-styles';
import { Colors } from '../../utilities';
import Profile from '../../components/profile';

class Settings extends Component {
    constructor(props){
      super(props);

      this.state = {
        currencyName: '',
      }
    }

    render() {
      const { user, navigation } = this.props;
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
              <Button
                title="Currency and Country"
                onPress={() => navigation.navigate('CurrCountryContainer')}
                color={Colors.main}
              />
            </View>
            <View style={styles.space}>
              <Button
                title="Tags"
                onPress={() => navigation.navigate('Tags')}
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

export default connect(mapStateToProps)(Settings);