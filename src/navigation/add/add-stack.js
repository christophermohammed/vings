import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import Basic from '../../screens/add/basic';
import More from '../../screens/add/more-details';

const AddNav = createStackNavigator({
  Basic,
  More
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

class AddStack extends Component {
    render() {
        return (
            <AppContainer screenProps={{goHome: this.props.goHome, type: this.props.type}}/>
        );
    }
}

export default AddStack;