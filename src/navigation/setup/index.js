import React from 'react';
import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import Demographic from '../../screens/setup/demographic';
import CurrCountry from '../../screens/curr-country';

const CurrCountryContainer = (props) => {
    const { screenProps, navigation } = props;
    return(
        <CurrCountry 
            screenProps={screenProps} 
            user={navigation.getParam('user')} 
            isSetup={true}
            goBack={() => navigation.navigate('Demographic')}
        />
    );
}

const SetupNav = createStackNavigator({
  Demographic,
  CurrCountryContainer
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

const SetupStack = (props) => {
    gotoMain = () => {
        props.navigation.navigate('Main');
    }
    return (
        <AppContainer screenProps={{gotoMain}}/>
    );
}

export default SetupStack;