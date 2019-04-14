import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import Demographic from '../../screens/setup/demographic';
import Country from '../../screens/setup/country';

const SetupNav = createStackNavigator({
  Demographic,
  Country
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

const AppContainer = createAppContainer(SetupNav);

class SetupStack extends Component {
    gotoMain = () => {
        this.props.navigation.navigate('Main');
    }
    render() {
        return (
            <AppContainer screenProps={{gotoMain:this.gotoMain}}/>
        );
    }
}

export default SetupStack;