import React, {Component} from 'react';
import { StyleSheet, Button, View, StatusBar, Dimensions, Image, ScrollView, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';

import NetSavingsCard from './NetSavingsCard';
import { Colors } from '../../../utilities/utils';
import Carousel from '../../carousel';

class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      user: null,
      users: [],

      refreshing: false,
      loading: false,
      photos: []
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
                <NetSavingsCard item={item}/>
            </View>
          }
          refreshing={this.state.refreshing}
          onRefresh={this.refreshFlatListAfterCreate}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  }

  getPhotosFromAzure = async () => {
    let url = 'https://vingsgallery.azurewebsites.net/api/GetPhotos?code=bAVDlZbfCJtiu5rDbk2DWBpVC95KvwnRqgoSHseEjw/77XXgOdzFdA==';
    try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });
        let resJson = await response.json();
        let fromAzure = JSON.parse(JSON.stringify(resJson));
        this.setState({photos: fromAzure.photos});
      } catch (error) {
        console.error(error);
    }
  }

  renderPhotos = () => {
    if(this.state.photos === []){
      return(
        <ActivityIndicator
          size="large"
          color={Colors.main}
        />
      );
    }else{
      return(
        <Carousel photos={this.state.photos}/>
      );
    }
  }

  async componentDidMount() {
    await this.updateUser();
    await this.getPhotosFromAzure();
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
        <View style={[this.state.loading ? styles.loadingStyle : {} , {marginTop: 10}]}>
          {this.renderPhotos()}
        </View>
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