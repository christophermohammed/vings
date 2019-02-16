import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { NetInfo } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import Settings from './src/components/screens/Settings';
import Vings from './src/components/vings';
import Offline from './src/components/screens/Offline';
import Blank from './src/components/screens/blank';
import { setPhotosToAsync } from './src/utilities/async';
import { photos } from './src/data/photos';

const SettingsNav = createStackNavigator({
  Settings: { 
    screen: Settings,
    navigationOptions: {
      headerTitle: "Settings"
    } 
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Settings: { screen: SettingsNav },
  Vings: { screen: Vings },
  Blank: { screen: Blank }
},{
  initialRouteName: 'Blank'
});

let AppContainer = createAppContainer(AppSwitchNavigator);

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
    this.setState({ isConnected });
  }

  render() {
    if(this.state.isConnected){
      return <AppContainer />
    }else{
      return <Offline />
    }
  }
}
export default App;