import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import AddTransaction from './AddTransaction';

class AddCost extends Component {
  goHome = () => {
    this.props.navigation.navigate("Home");
  }
  
  render() {
    return (
      <AddTransaction goHome={this.goHome} type="Cost" />
    );
  }
}

class AddSaving extends Component {
  goHome = () => {
    this.props.navigation.navigate("Home");
  }
  
  render() {
    return (
      <AddTransaction goHome={this.goHome} type="Savings" />
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
    } }
},{
  initialRouteName: 'AddCost',
  order: ['AddCost', 'AddSaving' ],
  tabBarOptions: {
    labelStyle: {
      color: "#4a69bd"
    },
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: "#4a69bd"
    }
  }
})

const AddContainer = createAppContainer(AddNav);

export default AddContainer;