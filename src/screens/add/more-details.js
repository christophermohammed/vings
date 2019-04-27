import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StatusBar, Button, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import MWIDropdown from '../../components/mwi-dropdown';
import { Colors, transactionType, SCREEN_WIDTH } from '../../utilities';
import { currencyNames, getCurrencyFromName } from '../../logic/currencies';
import { addToNetSav } from '../../state/currencies/actions';
import { addTransaction } from '../../state/transactions/actions';
import { addTag } from '../../state/tags/actions';
import { saveTransactionToAzure } from '../../logic/cloud';
import DateModal from '../../components/date-modal';
import TagsModal from '../../components/tags-modal';
import commonStyles from '../../utilities/common-styles';
import { buildRestOfTransaction } from '../../logic/add';
import moment from 'moment';

class More extends Component {
  constructor(props){
    super(props);

    this.state = {
      currencyName: "",
      isDateOpen: false,
      isTagsOpen: false,
      date: new Date,
      localTags: []
    }
  }   

  save = () => {
    // extract data 
    const { currencyName, date, localTags } = this.state;
    const { screenProps, addTransaction, navigation, user, addToNetSav } = this.props;
    let currency = getCurrencyFromName(currencyName);
    let transaction = navigation.getParam('transaction');
    let updatedTransaction = buildRestOfTransaction(transaction, currency, date, localTags);
    // verify and save
    if(updatedTransaction){
      //saveTransactionToAzure(transaction, user.uid);
      addTransaction(updatedTransaction);
      addToNetSav(updatedTransaction.amount, updatedTransaction.currency);
      navigation.navigate('Basic');
      screenProps.goHome();
    }
  }

  addTagToLocal = (tag) => {
    let newTags = JSON.parse(JSON.stringify(this.state.localTags));
    newTags.push(tag);
    this.setState({localTags: newTags});
  }

  removeTagFromLocal = (index) => {
    let newTags = JSON.parse(JSON.stringify(this.state.localTags));
    newTags.splice(index, 1);
    this.setState({localTags: newTags});
  }

  render() {
    const { currencyName, date, isDateOpen, isTagsOpen, localTags } = this.state;
    const { screenProps, tags, addTag } = this.props;
    let type = screenProps.type;
    return (
      <ScrollView>
      <View style={[commonStyles.container, {opacity: (isDateOpen || isTagsOpen) ? 0.5 : 1}]}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />

        {/* Currency Mod */}
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

        {/* Date mod */}
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
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-around', marginRight: 10, marginLeft: 10}]}>
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

        {/* Tags Mod */}
        <View style={commonStyles.space}>
          <Text style={commonStyles.detailTitle}>Tags</Text>
        </View>
        <View style={commonStyles.center}>
          <TagsModal 
            visible={isTagsOpen}
            closeTagsModal={() => this.setState({isTagsOpen: false})}
            addTag={tag => {
              addTag(tag);
              this.addTagToLocal(tag);
            }}
          />
        </View>
        <View style={{flexDirection: "row", justifyContent: 'space-evenly'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={commonStyles.detailSubtitle}>Your tags</Text>
            <FlatList 
              data={tags}
              keyExtractor={(_item, index) => (index).toString()}
              renderItem = {
                ({item, index})=>(
                  <TouchableOpacity onPress={() => this.addTagToLocal(item)} style={[commonStyles.regRow, {marginTop: 5, height: 30}]}>
                    <View style={[styles.tagColor, {backgroundColor: item.color, marginRight: 5}]}></View>
                    <Text style={{fontSize: 15}}>{item.name}</Text>
                  </TouchableOpacity>
                )
              }
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={commonStyles.detailSubtitle}>Tagged</Text>
            <FlatList 
              data={localTags}
              keyExtractor={(_item, index) => (index).toString()}
              renderItem = {
                ({item, index})=>(
                  <TouchableOpacity onPress={() => this.removeTagFromLocal(index)} style={[commonStyles.regRow, {marginTop: 5, height: 30}]}>
                    <View style={[styles.tagColor, {backgroundColor: item.color, marginRight: 5}]} />
                    <Text style={{fontSize: 15}}>{item.name}</Text>
                  </TouchableOpacity>
                )
              }
            />
          </View>
        </View>
        <View style={[commonStyles.space, { alignItems: 'flex-end', marginRight: 10}]}>
          <View style={{borderRadius: 10}}>
            <Button
              title="Add New Tag"
              onPress={() => this.setState({isTagsOpen: true})}
              color={Colors.main}
            />
          </View>
        </View>

        {/* Save / Back */}
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Back"
              onPress={() => this.props.navigation.navigate('Basic')}
              color={Colors.main}
            />
          </View>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Add"
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

const styles = StyleSheet.create({
  tagColor: {
    height: 20, 
    width: 20, 
    borderRadius: 10,  
  }
});

const mapStateToProps = ({user, tags}) => ({
  user, tags
});

const mapDispatchToProps = {
  addToNetSav,
  addTransaction,
  addTag 
};

export default connect(mapStateToProps, mapDispatchToProps)(More);