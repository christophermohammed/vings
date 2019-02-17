import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';

import Settings from '../screens/Settings';
import Vings from '../vings';
import Blank from '../screens/blank';

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

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;