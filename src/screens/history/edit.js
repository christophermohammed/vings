import React, { Component } from 'react';
import { View, Text, StatusBar, Button, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MWITextInput from '../../components/mwi-text-input';
import MWIDropdown from '../../components/mwi-dropdown';
import DateModal from '../../components/date-modal';
import TagsModal from '../../components/tags-modal';
import { currencyNames, getCurrencyFromName } from '../../logic/currencies';
import {updateTransactions} from '../../state/transactions/actions';
import { addToNetSav } from '../../state/currencies/actions';
import { addTag } from '../../state/tags/actions';
import commonStyles from '../../utilities/common-styles';
import { SCREEN_WIDTH, Colors, transactionType } from '../../utilities';
import {buildBasicTransaction, buildRestOfTransaction} from '../../logic/add';
import moment from 'moment';

class Edit extends Component {
  constructor(props) {
    super(props);
    
    let index = props.navigation.getParam('index');
    let oldTransaction = props.transactions[index];
    const { description, amount, location, date, currency, tags, type } = oldTransaction;

    this.state = {
      localDescription: description || "",
      localAmount: (amount && (type === transactionType.cost ? amount * -1 : amount).toString()) || "",
      localLocation: location || "",
      localDate: new Date(date) || null,
      localTags: tags,

      isDateOpen: false,
      isTagsOpen: false,
      currencyName: `${currency.name} (${currency.code})`
    };
  }

  save = () => {
    const { navigation, transactions, updateTransactions, addToNetSav, tags } = this.props;
    let index = navigation.getParam('index');
    let oldTransaction = transactions[index];
    const { localDescription, localAmount, localLocation, localDate, localTags, currencyName } = this.state;
    // build transaction
    let transaction = buildBasicTransaction(localDescription, localLocation, parseFloat(localAmount), oldTransaction.type ,oldTransaction.uid);
    if(transaction){
      let updatedTransaction = buildRestOfTransaction(transaction, getCurrencyFromName(currencyName), localDate);
      if(updatedTransaction){
        let finalTransaction = {
          ...updatedTransaction,
          tags: localTags
        }
        let newTransactions = JSON.parse(JSON.stringify(transactions));
        newTransactions.splice(index, 1, finalTransaction);
        updateTransactions(newTransactions);
        addToNetSav(oldTransaction.amount * -1, oldTransaction.currency);
        addToNetSav(finalTransaction.amount, finalTransaction.currency);
        navigation.navigate('History');
      }
    }
  }

  addTagToLocal = (tag) => {
    const { localTags } = this.state;
    if(localTags.length < 5){
      let newTags = JSON.parse(JSON.stringify(localTags));
      newTags.push(tag);
      this.setState({localTags: newTags});
    }else{
      alert("This transaction has the maximum number of tags");
    }
  }

  removeTagFromLocal = (index) => {
    let newTags = JSON.parse(JSON.stringify(this.state.localTags));
    newTags.splice(index, 1);
    this.setState({localTags: newTags});
  }

  render() {
    const { addTag, tags, navigation, transactions } = this.props;
    let index = navigation.getParam('index');
    let oldTransaction = transactions[index];
    const { description, amount, location, type } = oldTransaction;
    const { localDescription, localAmount, localLocation, localDate, localTags, isDateOpen, isTagsOpen, currencyName } = this.state;
    return (
    <ScrollView showsVerticalScrollIndicator={false}> 
      <View style={commonStyles.container}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
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
            placeholder={amount && (type === transactionType.cost ? amount * -1 : amount).toString()}
            value={localAmount}
            keyboardType="decimal-pad"
            width={SCREEN_WIDTH - 20}
            maxLength={12}
          />
        </View>
        {type === transactionType.cost ? (
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
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10}]}>
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
        {/* Tags Mod */}
        <View style={commonStyles.space}>
            <Text style={commonStyles.detailSubtitle}>Tags</Text>
        </View>
        <View style={commonStyles.center}>
          <TagsModal 
            tags={tags}
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
                  <TouchableOpacity 
                    onPress={() => this.addTagToLocal(item)} 
                    style={[commonStyles.regRow, {marginTop: 5, height: 30}]}
                  >
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
        <View style={[commonStyles.space, { alignItems: 'flex-end', marginRight: 10, marginTop: 15}]}>
          <View style={{borderRadius: 10}}>
            <Button
              title="Add New Tag"
              onPress={() => {
                if(localTags.length < 5){
                  this.setState({isTagsOpen: true});
                }else{
                  alert("This transaction has the maximum number of tags");
                }
              }}
              color={Colors.main}
            />
          </View>
        </View>
        {/* Save / Back */}
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Back"
              onPress={() => this.props.navigation.navigate('History')}
              color={Colors.main}
            />
          </View>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Save"
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

const mapStateToProps = ({transactions, tags}) => ({
  transactions, tags
});

const mapDispatchToProps = {
  updateTransactions,
  addTag,
  addToNetSav 
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
