import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { getPhotosFromAzure } from './src/utilities/cloud';
import { updatePhotos } from './src/state/photos/actions';
import { updateUser } from './src/state/user/actions';
import { updateTransactions } from './src/state/transactions/actions';
import { getUser, getTransactions } from './src/utilities/async';

class Landing extends Component {
  async componentDidMount() {
    // actions from props
    const { updateUser, updatePhotos, updateTransactions } = this.props;
    // get data from storage
    let transactions = await getTransactions();
    let user = await getUser();
    let photos = await getPhotosFromAzure();
    // set state
    updatePhotos(photos);
    updateUser(user);
    updateTransactions(transactions);
    // navigate 
    if(!user.uid){
      this.props.navigation.navigate("Settings");
    }else{
      this.props.navigation.navigate("Vings");
    }
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
  updateTransactions 
};

export default connect(null, mapDispatchToProps)(Landing);