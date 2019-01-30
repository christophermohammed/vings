import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import Settings from './src/screens/Settings';
import Vings from './src/Vings';

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

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
export default App;