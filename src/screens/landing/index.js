import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
// setters
import { updatePhotos } from '../../state/photos/actions';
import { updateUser } from '../../state/user/actions';
import { updateTransactions } from '../../state/transactions/actions';
import { updateCurrencies } from '../../state/currencies/actions';
import { updateTags } from '../../state/tags/actions';
import { updateRates } from '../../state/currencies/actions';
import startup from '../../logic/startup';

class Landing extends Component {
  async componentDidMount() {
    // actions from props
    const { updateUser, updatePhotos, updateTransactions, updateCurrencies, updateTags, updateRates, navigation } = this.props;
    // call startup
    await startup(
      updatePhotos,
      updateUser,
      updateTransactions,
      updateCurrencies,
      updateTags,
      updateRates,
      navigation
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
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
  updateRates 
};

export default connect(null, mapDispatchToProps)(Landing);