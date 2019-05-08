import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import History from '../../screens/history';
import Edit from '../../screens/history/edit';

const AddNav = createStackNavigator({
  History,
  Edit
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

const AppContainer = createAppContainer(AddNav);

export default AppContainer;