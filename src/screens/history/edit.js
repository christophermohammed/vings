import React, { Component } from 'react';
import { View, Text, StatusBar, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import MWITextInput from '../../components/mwi-text-input';
import MWIDropdown from '../../components/mwi-dropdown';
import DateModal from '../../components/date-modal';
import { currencyNames, getCurrencyFromName } from '../../logic/currencies';
import {updateTransactions} from '../../state/transactions/actions';
import commonStyles from '../../utilities/common-styles';
import { SCREEN_WIDTH, Colors } from '../../utilities';
import moment from 'moment';

class Edit extends Component {
  constructor(props) {
    super(props);
    
    const { description, amount, location, date, currency } = props.navigation.getParam('transaction');

    this.state = {
        localDescription: description || "",
        localAmount: amount.toString() || "",
        localLocation: location || "",
        localDate: new Date(date) || null,

        isDateOpen: false,
        currencyName: `${currency.name} (${currency.code})`
    };
  }

  save = () => {
    navigation.navigate('History');
  }

  render() {
    const { description, amount, location, date } = this.props.navigation.getParam('transaction');
    const { localDescription, localAmount, localLocation, localDate, isDateOpen, currencyName } = this.state;
    return (
    <ScrollView showsVerticalScrollIndicator={false}> 
      <View style={commonStyles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={[commonStyles.space, commonStyles.center]}>
            <View style={{ borderRadius: 10}}>
                <Button
                  title="Tags"
                  onPress={() => this.props.navigation.navigate('Tags')}
                  color={Colors.main}
                />
            </View>
        </View>
        {/* Basic Info */}
        <View style={[commonStyles.space, commonStyles.center]}>
          <MWITextInput 
            message="Description"
            placeholder={description}
            value={localDescription}
            onChange={localDescription => this.setState({localDescription})}
            getRef={desc => { this.descriptionInput = desc }}
            width={SCREEN_WIDTH - 20}
            maxLength={50}
          />
        </View>
        <View style={[commonStyles.space, commonStyles.center]}>
          <MWITextInput
            message="Amount"
            getRef={amt => { this.amountInput = amt }}
            onChange={localAmount => this.setState({localAmount})}
            placeholder={amount.toString()}
            value={localAmount}
            keyboardType="decimal-pad"
            width={SCREEN_WIDTH - 20}
            maxLength={12}
          />
        </View>
        {amount < 0 ? (
            <View style={[commonStyles.space, commonStyles.center]}>
              <MWITextInput
                message="Location" 
                getRef={loc => { this.locationInput = loc }}
                onChange={localLocation => this.setState({localLocation})}
                placeholder={location}
                value={localLocation}
                width={SCREEN_WIDTH - 20}
                textContentType="location"
                maxLength={50}
              />
            </View>
        ) : null }
        {/* Currency */}
        <View style={commonStyles.space}>
          <MWIDropdown
            query={currencyName}
            setQuery={(currencyName) => this.setState({currencyName})} 
            data={currencyNames}
            fullData={currencyNames}
            message="Currency"
            isOpen={true}
          />
        </View>
        {/* Date */}
        <View style={commonStyles.space}>
            <Text style={commonStyles.detailSubtitle}>Date</Text>
        </View>
        <View style={commonStyles.center}>
          <DateModal 
            visible={isDateOpen}
            closeDateModal={() => this.setState({isDateOpen: false})}
            setDate={d => this.setState({localDate: d})}
          />
          <Text style={commonStyles.detailSubtitle}>{localDate.toDateString()}</Text>
        </View>
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-around', marginRight: 10, marginLeft: 10}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Today"
              onPress={() => this.setState({localDate: new Date})}
              color={Colors.main}
              disabled={moment(localDate).isSame(new Date, 'day')}
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
        <View style={[commonStyles.space, commonStyles.center]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Tags"
              onPress={this.save}
              color={Colors.main}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({transactions}) => ({
  transactions
});

const mapDispatchToProps = {
  updateTransactions 
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
