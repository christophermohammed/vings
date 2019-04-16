import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { updatePhotos } from '../../state/photos/actions';
import { updateUser } from '../../state/user/actions';
import { updateTransactions } from '../../state/transactions/actions';
import { updateCurrencies } from '../../state/currencies/actions';
import startup from './startupLogic';

class Landing extends Component {
  async componentDidMount() {
    // actions from props
    const { updateUser, updatePhotos, updateTransactions } = this.props;
    // call startup
    await startup(
      updatePhotos,
      updateUser,
      updateTransactions,
      this.props.navigation
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
  updateCurrencies 
};

export default connect(null, mapDispatchToProps)(Landing);