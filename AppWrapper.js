import React, { Component } from 'react';
import AppContainer from './src/navigation/app-container';
import { getPhotosFromAzure } from './src/utilities/cloud';
import { updatePhotos } from './src/state/photos/actions';
import { updateUser } from './src/state/user/actions';
import { updateTransactions } from './src/state/user/actions';
import { connect } from 'react-redux';

class AppWrapper extends Component {
  async componentDidMount(){
    let photos = await getPhotosFromAzure();
    this.props.updatePhotos(photos);
  }
  
  render() {
    return (
      <AppContainer />
    );
  }
}

const mapDispatchToProps = {
  updatePhotos,
  updateUser,
  updateTransactions 
};

export default connect(null, mapDispatchToProps)(AppWrapper);