import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';

import NetSavingsCard from './NetSavingsCard';
import Tip from './Tip';
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

  async componentDidMount() {
    await this.updateUser();
    await this.getPhotosFromAzure();
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
          {/* Net savings section */}
          <View style={[styles.section, {marginTop: 0}]}>
            <Text style={styles.title}>Savings</Text>
            <View style={this.state.loading ? styles.loadingStyle : {height: 70}}>
              {this.renderLoading()}
            </View>
          </View>
          {/* Tip section */}
          <View style={styles.section}>
            <Text style={styles.title}>Tip of the day</Text>
            <Tip />
          </View>
          {/* Gallery section */}
          <View style={styles.section}>
            <Text style={styles.title}>Gallery</Text>
            <Carousel photos={this.state.photos}/>
          </View>
          {/*<Button 
            title="Clear"
            onPress={this.clearAsync}
          />*/}
        </View>
      </ScrollView>
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
    
  },
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  section: {
    padding: 10,
    marginTop: 30
  }
});

export default Home;