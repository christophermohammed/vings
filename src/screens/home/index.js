import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, ScrollView, Button } from 'react-native';
import NetSavingsCard from '../../components/netsavings-card';
import Tip from '../../components/tip-of-the-day';
import Carousel from '../../components/carousel';
import styles from '../../utilities/common-styles';
import { clearAsync } from '../../utilities/async';
import { getCurrencyFromCode } from '../../utilities/currencies';

class Home extends Component {
  
  constructor(props){
    super(props);

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
              <NetSavingsCard netSav={user.netSav} currency={getCurrencyFromCode(user.currencyCode)}/>
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

const homeStyles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  gallery: {
    paddingTop: 10,
    paddingBottom: 10,
  }
});

const mapStateToProps = ({user, photos}) => ({
  user,
  photos
});

export default connect(mapStateToProps)(Home);