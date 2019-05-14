import React, {Component} from 'react';
import { ScrollView, View, StatusBar, Button, Text } from 'react-native';
import MWIDropdown from '../../components/mwi-dropdown';
import { Colors, transactionType, SCREEN_WIDTH } from '../../utilities';
import { currencyNames, getCurrencyFromName } from '../../logic/currencies';
import DateModal from '../../components/date-modal';
import commonStyles from '../../utilities/common-styles';
import { buildRestOfTransaction } from '../../logic/add';
import moment from 'moment';

class More extends Component {
  constructor(props){
    super(props);

    this.state = {
      currencyName: "",
      isDateOpen: false,
      date: new Date,
    }
  }   

  next = () => {
    // extract data 
    const { currencyName, date } = this.state;
    const { navigation } = this.props;
    let currency = getCurrencyFromName(currencyName);
    let transaction = navigation.getParam('transaction');
    let updatedTransaction = buildRestOfTransaction(transaction, currency, date);
    // verify and save
    if(updatedTransaction){
      navigation.navigate('Tags', { transaction: updatedTransaction });
    }
  }

  render() {
    const { currencyName, date, isDateOpen, isTagsOpen } = this.state;
    const { screenProps } = this.props;
    let type = screenProps.type;
    return (
      <ScrollView>
      <View style={[commonStyles.container, {opacity: (isDateOpen || isTagsOpen) ? 0.5 : 1}]}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        {/* Currency */}
        <View style={commonStyles.space}>
          <Text style={commonStyles.detailTitle}>Currency</Text>
        </View>
        <View style={commonStyles.space}>
          <MWIDropdown
            query={currencyName}
            setQuery={(currencyName) => this.setState({currencyName})} 
            data={currencyNames}
            fullData={currencyNames}
            message={`What currency did you ${type === transactionType.cost ? "spend" : "save"}?`}
          />
        </View>
        {/* Date */}
        <View style={commonStyles.space}>
          <Text style={commonStyles.detailTitle}>Date</Text>
        </View>
        <View style={commonStyles.center}>
          <DateModal 
            visible={isDateOpen}
            closeDateModal={() => this.setState({isDateOpen: false})}
            setDate={d => this.setState({date: d})}
          />
          <Text style={commonStyles.detailSubtitle}>{date ? date.toDateString() : ""}</Text>
        </View>
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Today"
              onPress={() => this.setState({date: new Date})}
              color={Colors.main}
              disabled={moment(date).isSame(new Date, 'day')}
            />
          </View>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Select Date"
              onPress={() => this.setState({isDateOpen: true})}
              color={Colors.main}
            />
          </View>
        </View>

        {/* Save / Back */}
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Back"
              onPress={() => this.props.navigation.navigate('Basic')}
              color={Colors.main}
            />
          </View>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Next"
              onPress={this.next}
              color={Colors.main}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

export default More;