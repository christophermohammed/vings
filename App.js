import React, { Component } from 'react';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import AppContainer from './src/navigation/app-container';
import Offline from './src/screens/offline';
import { setPhotosToAsync } from './src/utilities/async';
import { photos } from './src/data/photos';
import store from './src/state/store';

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
      return <Provider store={store}><AppContainer /></Provider>;
    }else{
      return <Offline />;
    }
  }
}
export default App;