import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import AddTransaction from '../../screens/add/basic';
import { Colors } from '../../utilities';
import { transactionType } from '../../utilities';

class AddCost extends Component {
  goHome = () => {
    this.props.navigation.navigate("Home");
  }
  
  render() {
    return (
      <AddTransaction goHome={this.goHome} type={transactionType.cost} />
    );
  }
}

class AddSaving extends Component {
  goHome = () => {
    this.props.navigation.navigate("Home");
  }
  
  render() {
    return (
      <AddTransaction goHome={this.goHome} type={transactionType.savings} />
    );
  }
}

const AddNav = createMaterialTopTabNavigator({
  AddCost:{ screen : AddCost,
    navigationOptions: {
      tabBarLabel: 'Cost',
    }
  },
  AddSaving:{ screen : AddSaving,
    navigationOptions: {
      tabBarLabel: 'Savings',
    } 
  }
},{
  initialRouteName: 'AddCost',
  order: ['AddCost', 'AddSaving' ],
  tabBarOptions: {
    labelStyle: {
      color: Colors.main
    },
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: Colors.main
    }
  }
})

const AddContainer = createAppContainer(AddNav);

export default AddContainer;