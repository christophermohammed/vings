import React, { Component } from 'react';
import { View, StatusBar, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../../utilities';
import Profile from '../../components/profile';
import commonStyles from '../../utilities/common-styles';
import Icon from 'react-native-vector-icons/Ionicons';

class Settings extends Component {
  render() {
    const { user, navigation } = this.props;
    return (
      <ScrollView>
        <View>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
          <View style={commonStyles.space}>
            <Profile user={user}/>
          </View>
          <View style={[commonStyles.space, {marginTop: 20}]}>
              <Text style={commonStyles.detailTitle}>Edit</Text>
          </View>
          <View style={commonStyles.space}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('CurrCountryContainer')}
              style={[{height: 30, flex: 1, alignItems: 'center'}, commonStyles.regRow]}
            >
              <Text style={[{color: 'black'}, commonStyles.detailSubtitle]}>Currency and Country</Text>
              <View style={{marginRight: 15}}>
                <Icon name="ios-arrow-dropright" size={25} color={Colors.main}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={commonStyles.space}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Tags')}
              style={[{height: 30, flex: 1, alignItems: 'center'}, commonStyles.regRow]}
            >
              <Text style={[{color: 'black'}, commonStyles.detailSubtitle]}>Tags</Text>
              <View style={{marginRight: 15}}>
                <Icon name="ios-arrow-dropright" size={25} color={Colors.main}/>
              </View>
            </TouchableOpacity>
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