import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, ScrollView, Button, FlatList } from 'react-native';
import NetSavingsCard from '../../components/netsavings-card';
import Carousel from '../../components/carousel';
import commonStyles from '../../utilities/common-styles';
import { clearAsync } from '../../logic/async';
import { getCurrencyFromCode } from '../../logic/currencies';
import TransactionCard from '../../components/transactions-card';
// import { AdMobBanner } from 'expo-ads-admob';

class Home extends Component {
  render() {
    const { photos, currency, localTransactions } = this.props;
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
            />
            {/* Net savings section */}
            <View style={commonStyles.space}>
              <Text style={commonStyles.detailTitle}>Savings</Text>
            </View>
            <View style={commonStyles.space}>
              <NetSavingsCard currency={currency}/>
            </View>
            {/* Recent transactions section */}
            <View style={commonStyles.space}>
              <Text style={commonStyles.detailTitle}>Recent Transactions</Text>
            </View>
            <View style={commonStyles.space}>
              <View style={[commonStyles.container, {backgroundColor: 'white', borderRadius: 10}, commonStyles.shadow]}>
                {localTransactions.length > 0 &&
                  <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={localTransactions}
                    keyExtractor={(_item, index) => (index).toString()}
                    renderItem={({item, index}) => 
                      <View>
                        <TransactionCard item={item} />
                      </View>
                    }
                  />
                }
                {localTransactions.length < 1 &&
                  <View style={[commonStyles.center, {paddingTop: 20, paddingBottom: 20}]}>
                    <Text style={{fontSize: 15}}>You don't seem to have any transactions...</Text>
                  </View>
                }
              </View>
            </View>
            {/* Tips section */}
            <View style={commonStyles.space}>
              <Text style={commonStyles.detailTitle}>Tips</Text>
            </View>
            <View style={homeStyles.gallery}>
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
  gallery: {
    paddingTop: 10,
    paddingBottom: 10,
  }
});

const mapStateToProps = ({user, photos, currencies, transactions}) => {
  let currency = getCurrencyFromCode(user.currencyCode, currencies);
  let localTransactions = transactions.slice(0, 5);
  return {photos, currency, localTransactions};
};

export default connect(mapStateToProps)(Home);