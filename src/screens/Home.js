import React, {Component} from 'react';
import { StyleSheet, Button, Text, View, StatusBar, Dimensions, Image, ScrollView, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = {
        user: null
    }
  }

  displayUserInfo = async () => {
    let user = this.state.user;
    alert("UID:" + user.uid + " Age:" + user.age + " Gender:" + user.gender + " Net Savings:" + user.netSav);
  }

  clearAsync = async () => {
    await AsyncStorage.clear();
  }

  async componentDidMount() {
    let json = await AsyncStorage.getItem("user");
    this.setState({user: JSON.parse(json)});
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Image source={require('./../../assets/BeachFace.jpg')} style={styles.homeImage}/>
        <Button 
          title="Display"
          onPress={this.displayUserInfo}
        />
        <Button 
          title="clear"
          onPress={this.clearAsync}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  welcome: {
    fontSize: 40,
    padding: 10,
    color: 'black'
  },
  homeImage: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_WIDTH - 20,
    borderRadius: 10
  }
});

export default Home;