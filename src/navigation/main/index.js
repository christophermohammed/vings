import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../../screens/home';
import Settings from '../settings';
import Add from '../add/add-tab';
import History from '../../screens/history';
import Converter from '../../screens/converter';
import { Colors } from '../../utilities';

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
  },
  Settings:{ screen : Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    } 
  },
  Converter:{ screen : Converter,
    navigationOptions: {
      tabBarLabel: 'Converter',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ios-expand" color={tintColor} size={24} />
      )
    } 
  },
},{
  navigationOptions: ({navigation}) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: routeName,
      headerTitleStyle: {
        color: Colors.main
      },
    };
  },
  initialRouteName: 'Home',
  order: ['Converter','History','Home', 'Add', 'Settings'],
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
