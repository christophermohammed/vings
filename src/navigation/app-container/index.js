import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import Setup from '../setup';
import Main from '../main';
import Landing from '../../screens/landing';

const SetupWithHeader = createStackNavigator({
  Setup: { 
    screen: Setup,
    navigationOptions: {
      headerTitle: "Setup"
    } 
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Setup: { screen: SetupWithHeader },
  Main: { screen: Main },
  Landing: { screen: Landing }
},{
  initialRouteName: 'Landing'
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;