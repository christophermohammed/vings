import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';

import NetSavingsCard from '../../netsavingsCard';
import Tip from '../../tipoftheday';
import { clearAsync, getUser } from '../../../utilities/utils';
import { getPhotosFromAzure } from './home-logic';
import Carousel from '../../carousel';

class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      user: {
        netSav: 0
      },

      refreshing: false,
      loading: false,
      photos: []
    }
  }

  async componentDidMount() {
    await this.refreshFlatList();
    await getPhotosFromAzure(this.setPhotos);
  }

  refreshFlatList = async () => {
    this.setState({refreshing: true});
    let user = await getUser();
    if(user !== null){
      this.setState({user: user});
    }
    this.setState({refreshing: false})
  }

  setPhotos = (photos) => {
    this.setState({photos: photos});
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
            <View style={{height: 70}}>
              <FlatList
                data={[this.state.user]}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({item}) => 
                  <View>
                      <NetSavingsCard item={item}/>
                  </View>
                }
                refreshing={this.state.refreshing}
                onRefresh={this.refreshFlatList}
                showsVerticalScrollIndicator={false}
              />
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
          <Button 
            title="Clear"
            onPress={clearAsync}
          />
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