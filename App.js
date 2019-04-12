import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AppContainer from './src/navigation/app-container';
import Offline from './src/screens/offline';
import store from './src/state/store';

class App extends Component { 
  constructor(){
    super();
    YellowBox.ignoreWarnings(['Require cycle:']);
    this.state = {
      isConnected: true
    }
  }
  
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
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