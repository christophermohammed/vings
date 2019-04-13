import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import Setup from '../../screens/setup';
import Main from '../main';
import Landing from '../../screens/landing';

const SetupNav = createStackNavigator({
  Setup: { 
    screen: Setup,
    navigationOptions: {
      headerTitle: "Setup"
    } 
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Setup: { screen: SetupNav },
  Main: { screen: Main },
  Landing: { screen: Landing }
},{
  initialRouteName: 'Landing'
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;