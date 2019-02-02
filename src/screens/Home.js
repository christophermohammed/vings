import React, {Component} from 'react';
import { StyleSheet, Button, View, StatusBar, Dimensions, Image, ScrollView, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';

import HomeCard from '../components/HomeCard';
import { Colors } from '../utilities/utils';
import Carousel from '../components/carousel/index';
import { SCREEN_WIDTH } from '../utilities/utils';

class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      user: null,
      users: [],

      refreshing: false,
      loading: false,
    }
  }

  displayUserInfo = async () => {
    let user = this.state.user;
    alert("UID:" + user.uid + " Age:" + user.age + " Gender:" + user.gender + " Net Savings:" + user.netSav);
  }

  clearAsync = async () => {
    await AsyncStorage.clear();
  }

  updateUser = async () => {
    let json = await AsyncStorage.getItem("user");
    let user = JSON.parse(json);
    let users = [];
    if(user !== null){
      users.push(user);
      this.setState({user: user, users: users});
    }
  }

  refreshFlatListAfterCreate = async () => {
    this.setState({refreshing: true});
    await this.updateUser();
    this.setState({refreshing: false})
  }

  renderLoading = () => {
    if(this.state.loading){
      return(
        <ActivityIndicator
          size="large"
          color={Colors.main}
        />
      );
    }else{ 
      return(
        <FlatList
          data={this.state.users}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => 
            <View>
                <HomeCard item={item}/>
            </View>
          }
          refreshing={this.state.refreshing}
          onRefresh={this.refreshFlatListAfterCreate}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }

  async componentDidMount() {
    await this.updateUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={[this.state.loading ? styles.loadingStyle : {height: 90}, {marginTop: 10}]}>
          {this.renderLoading()}
        </View>
        <Carousel />
        {/*<Button 
          title="Clear"
          onPress={this.clearAsync}
        />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 40,
    padding: 10,
    color: 'black'
  },
  container: {
    flex: 0,
    padding: 10,
    alignItems: 'center'
  },
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home;