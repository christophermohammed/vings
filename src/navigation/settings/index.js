import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import Settings from '../../screens/settings';
import CurrCountryContainer from './curr-country';
import Tags from '../../screens/tags';

const SettingsNav = createStackNavigator({
  Settings,
  CurrCountryContainer,
  Tags
},{
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  }),
  defaultNavigationOptions: () => {
    return {
      header: null
    };
  }
});

const AppContainer = createAppContainer(SettingsNav);

export default AppContainer;