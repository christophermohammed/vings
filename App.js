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

const SettingsNav = createStackNavigator({
  Settings: { 
    screen: Settings,
    navigationOptions: {
      headerTitle: "Settings"
    } 
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Settings: { 
    screen: SettingsNav
  },
  Vings: { screen: Vings }
},{
  initialRouteName: 'Vings'
});

let AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component { 
  constructor(){
    super();

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
      return <AppContainer />
    }else{
      return <Offline />
    }
  }
}
export default App;