import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import AppContainer from './src/components/app-container';
import Offline from './src/components/screens/Offline';
import { setPhotosToAsync } from './src/utilities/async';
import { photos } from './src/data/photos';

class App extends Component { 
  constructor(){
    super();

    this.state = {
      isConnected: true
    }
  }
  
  async componentDidMount() {
    await setPhotosToAsync(photos);
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    console.log(isConnected);
    this.setState({ isConnected });
  }

  render() {
    if(this.state.isConnected){
      return <AppContainer />;
    }else{
      return <Offline />;
    }
  }
}
export default App;