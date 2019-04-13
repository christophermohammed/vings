import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import Settings from '../../screens/settings';
import Main from '../main';
import Landing from '../../screens/landing';

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
  Main: { screen: Main },
  Landing: { screen: Landing }
},{
  initialRouteName: 'Landing'
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;