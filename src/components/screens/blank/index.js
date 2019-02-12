import React, { Component } from 'react';
import { View } from 'react-native';
import { getUser } from '../../../utilities/utils';

class Blank extends Component {
  setUp = async () => {
    let user = await getUser();
    if(!user.uid){
      this.props.navigation.navigate("Settings");
    }else{
      this.props.navigation.navigate("Vings");
    }
  }

  async componentDidMount() {
    await this.setUp();
  }

  render() {
    return (
      <View style={{flex: 1}}>

      </View>
    );
  }
}

export default Blank;