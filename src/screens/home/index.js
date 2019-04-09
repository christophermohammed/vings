import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, RefreshControl } from 'react-native';
import NetSavingsCard from '../../components/netsavings-card';
import Tip from '../../components/tip-of-the-day';
import { getUser, getPhotosFromAsync } from '../../utilities/async';
import { getPhotosFromAzure } from '../../utilities/cloud';
import Carousel from '../../components/carousel';
import { Colors } from '../../utilities/utils';


class Home extends Component {
  
  constructor(props){
    super(props);

    this.mounted = false;

    this.state = {
      netSav: 0.001,
      photos: [],
      currency: "$",
      index: Math.floor(Math.random() * 99),
      refreshing: false
    }
  }

  async shouldComponentUpdate(){
    let user = await getUser();
    return((this.state.photos && this.state.photos.length < 1) || (user.netSav !== this.state.netSav));
  }

  async componentDidMount() {
    this.mounted = true;
    await this.refresh();
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
    this.setState({refreshing: true});
    let user = await getUser();
    if(user !== null && this.mounted){
      this.setState({netSav: user.netSav, currency: user.currency, refreshing: false});
    }
  }

  render() {
    return (
      <View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
              colors={[Colors.main]}
              progressBackgroundColor="white"
              tintColor={Colors.main}
              title="Pull to refresh"
            />
          }
        >
          <View>
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
            />
            {/* Net savings section */}
            <View style={[styles.section, {marginTop: 0}]}>
              <Text style={styles.title}>Savings</Text>
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