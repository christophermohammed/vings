import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Add from '../screens/Add/Add';
import History from '../screens/History';
import { Colors } from '../../utilities/utils';

const VingsNav = createMaterialBottomTabNavigator({
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
  VingsNav: VingsNav 
});

const VingsContainer = createAppContainer(StackNav);

export default VingsContainer;
