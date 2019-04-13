import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../../screens/home';
import Add from '../add';
import History from '../../screens/history';
import { Colors } from '../../utilities/utils';

const MainNav = createMaterialBottomTabNavigator({
  Home:{ screen : Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Add:{ screen : Add,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-add" color={tintColor} size={24} />
      )
    } 
  },
  History:{ screen : History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-list" color={tintColor} size={24} />
      )
    } 
  }
},{
  navigationOptions: ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: routeName
    };
  },
  initialRouteName: 'Home',
  order: ['History','Home', 'Add'],
  activeTintColor: Colors.secondary,
  inactiveTintColor: Colors.main,
  barStyle: { backgroundColor: 'white' },
  shifting: true
});

const StackNav = createStackNavigator({
  MainNav: MainNav 
});

const MainContainer = createAppContainer(StackNav);

export default MainContainer;
