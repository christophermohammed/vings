import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import Settings from './src/screens/Settings';
import Vings from './src/Vings';

const AppSwitchNavigator = createSwitchNavigator({
  Settings: { screen: Settings },
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