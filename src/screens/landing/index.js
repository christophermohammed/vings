import React, { Component } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Tip from '../../components/tip-of-the-day';
import { tips } from '../../data/tips';
import { Colors } from '../../utilities';
import commonStyles from '../../utilities/common-styles';
// setters
import { updatePhotos } from '../../state/photos/actions';
import { updateUser } from '../../state/user/actions';
import { updateTransactions } from '../../state/transactions/actions';
import { updateCurrencies, addToNetSav } from '../../state/currencies/actions';
import { updateTags } from '../../state/tags/actions';
import { updateRates } from '../../state/currencies/actions';
import startup from '../../logic/startup';

class Landing extends Component {
  async componentDidMount() {
    // actions from props
    const { updateUser, updatePhotos, updateTransactions, updateCurrencies, updateTags, updateRates, addToNetSav, navigation } = this.props;
    // call startup
    await startup(
      updatePhotos,
      updateUser,
      updateTransactions,
      updateCurrencies,
      updateTags,
      updateRates,
      addToNetSav,
      navigation
    );
  }

  render() {
    return (
      <View style={[commonStyles.center, {flex: 1}]}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Tip tip={tips[Math.floor(Math.random()*99)]} color="black"/>
        <View style={{marginTop: 20}}>
          <ActivityIndicator 
            size="large"
            color={Colors.main}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  updatePhotos,
  updateUser,
  updateTransactions,
  updateCurrencies,
  updateTags,
  updateRates,
  addToNetSav 
};

export default connect(null, mapDispatchToProps)(Landing);