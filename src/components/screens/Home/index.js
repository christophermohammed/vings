import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, ScrollView } from 'react-native';
import NetSavingsCard from '../../netsavingsCard';
import Tip from '../../tipoftheday';
import { clearAsync, getUser, getPhotosFromAsync } from '../../../utilities/async';
import { getPhotosFromAzure } from '../../../utilities/cloud';
import Carousel from '../../carousel';
import VIcon from '../../VIcon';


class Home extends Component {
  
  constructor(props){
    super(props);

    this.mounted = false;

    this.state = {
      netSav: 0.001,
      photos: [],
      currency: "$",
      index: Math.floor(Math.random() * 99),
    }
  }

  async shouldComponentUpdate(){
    let user = await getUser();
    if((this.state.photos && this.state.photos.length < 1) || (user.netSav !== this.state.netSav)){
      return true;
    }
    return false;
  }

  async componentDidMount() {
    this.mounted = true;
    await this.refresh();
    await getPhotosFromAzure();
    let photos = await getPhotosFromAsync();
    if(this.mounted){
      this.setState({photos: photos});
    }
  }

  async componentDidUpdate() {
    let photos = await getPhotosFromAsync();
    if(this.mounted){
      this.setState({photos: photos});
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  refresh = async () => {
    let user = await getUser();
    if(user !== null && this.mounted){
      this.setState({netSav: user.netSav, currency: user.currency});
    }
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
              <NetSavingsCard netSav={this.state.netSav} currency={this.state.currency}/>
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
            {/* <Button 
              title="Clear"
              onPress={clearAsync}
            /> */}
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