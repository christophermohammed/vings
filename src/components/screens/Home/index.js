import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView, AsyncStorage } from 'react-native';
import NetSavingsCard from '../../netsavingsCard';
import Tip from '../../tipoftheday';
import { clearAsync, getUser, getTransactions, setDate, getDate, getPhotosFromAsync, setPhotosToAsync } from '../../../utilities/utils';
import { getPhotosFromAzure } from './home-logic';
import Carousel from '../../carousel';
import VIcon from '../../VIcon';


class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      netSav: 0,
      photos: [],

      index: Math.floor(Math.random() * 99),
    }
  }

  async componentDidMount() {
    if(this.state.netSav === 0 || this.state.photos.length < 1){
      await this.refresh();
      await this.getPhotos();
      setTip();
    }
  }

  async componentDidUpdate() {
    if(this.state.photos.length < 1){
      await this.getPhotos();
    }
  }

  refresh = async () => {
    let user = await getUser();
    if(user !== null){
      this.setState({netSav: user.netSav});
    }
  }

  getPhotos = async() => {
    let oldDate = await getDate();
    let date = Date.toString();
    if(oldDate !== date){
      let photos = await getPhotosFromAzure(this.setPhotos);
      await setPhotosToAsync(photos);
      await setDate(date);
    }else{
      await getPhotosFromAsync(this.setPhotos);
    }
  }

  setPhotos = (photos) => {
    this.setState({photos: photos});
  }

  setTip = () => {
    this.setState({index: Math.floor(Math.random() * 99)});  
  }

  render() {
    return (
      <View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          <View>
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
            />
            {/* Net savings section */}
            <View style={[styles.section, {marginTop: 0}]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Savings</Text>
                <View style={{justifyContent: 'center'}}>
                  <VIcon action={this.refresh} size={20} name="ios-refresh"/>
                </View>
              </View>
              <NetSavingsCard netSav={this.state.netSav}/>
            </View>
            {/* Tip section */}
            <View style={styles.section}>
              <Text style={styles.title}>Tips</Text>
              <Tip index={this.state.index}/>
            </View>
            {/* Gallery section */}
            <View style={styles.gallery}>
              <Text style={[styles.title, {paddingLeft: 10, paddingRight: 10}]}>Gallery</Text>
              <Carousel photos={this.state.photos}/>
            </View>
            <Button 
              title="Clear"
              onPress={clearAsync}
            />
          </View>
        </ScrollView>
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
    marginTop: 20
  },
  gallery: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20
  }
});

export default Home;