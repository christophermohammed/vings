import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, RefreshControl } from 'react-native';
import NetSavingsCard from '../../components/netsavings-card';
import Tip from '../../components/tip-of-the-day';
import Carousel from '../../components/carousel';
import styles from '../../utilities/common-styles';

class Home extends Component {
  
  constructor(props){
    super(props);

    this.mounted = false;

    this.state = {
      index: Math.floor(Math.random() * 99),
    }
  }

  render() {
    const { user, photos } = this.props;
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
            />
            {/* Net savings section */}
            <View style={styles.space}>
              <Text style={homeStyles.title}>Savings</Text>
              <NetSavingsCard netSav={user.netSav} currency={user.currency}/>
            </View>
            {/* Tip section */}
            <View style={styles.space}>
              <Text style={homeStyles.title}>Tips</Text>
              <Tip index={this.state.index}/>
            </View>
            {/* Gallery section */}
            <View style={homeStyles.gallery}>
              <Text style={[homeStyles.title, {paddingLeft: 10, paddingRight: 10}]}>Gallery</Text>
              <Carousel photos={photos}/>
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

const homeStyles = StyleSheet.create({
  welcome: {
    fontSize: 40,
    padding: 10,
    color: 'black'
  },
  title: {
    fontSize: 30,
  },
  gallery: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20
  }
});

const mapStateToProps = ({user, photos}) => ({
  user,
  photos
});

export default connect(mapStateToProps)(Home);