import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, ScrollView, Button } from 'react-native';
import NetSavingsCard from '../../components/netsavings-card';
import MWIPicker from '../../components/mwi-picker';
import { genders } from '../../utilities';
import Tip from '../../components/tip-of-the-day';
import Carousel from '../../components/carousel';
import styles from '../../utilities/common-styles';
import { clearAsync } from '../../logic/async';
import { getCurrencyFromCode } from '../../logic/currencies';
// import { AdMobBanner } from 'expo-ads-admob';

class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      index: Math.floor(Math.random() * 99),
    }
  }

  render() {
    const { photos, user, currencies } = this.props;
    let currency = getCurrencyFromCode(user.currencyCode, currencies);
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
              <NetSavingsCard currency={currency}/>
            </View>
            {/* <AdMobBanner
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
              testDeviceID="EMULATOR"
              onDidFailToReceiveAdWithError={() => {}} 
            /> */}
            {/* Tip section */}
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

const mapStateToProps = ({user, photos, currencies}) => ({
  user,
  currencies,
  photos
});

export default connect(mapStateToProps)(Home);