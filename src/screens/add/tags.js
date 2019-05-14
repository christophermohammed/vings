import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StatusBar, Button, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../utilities';
import { addToNetSav } from '../../state/currencies/actions';
import { addTransaction } from '../../state/transactions/actions';
import { addTag } from '../../state/tags/actions';
import { saveTransactionToAzure } from '../../logic/cloud';
import TagsModal from '../../components/tags-modal';
import commonStyles from '../../utilities/common-styles';

class Tags extends Component {
  constructor(props){
    super(props);

    this.state = {
      isTagsOpen: false,
      localTags: []
    }
  }   

  save = () => {
    // extract data 
    const { localTags } = this.state;
    const { screenProps, addTransaction, navigation, user, addToNetSav } = this.props;
    let transaction = navigation.getParam('transaction');
    let updatedTransaction = {
      ...transaction,
      tags: localTags
    };
    // verify and save
    if(transaction){
      //saveTransactionToAzure(transaction, user.uid);
      addTransaction(updatedTransaction);
      addToNetSav(updatedTransaction.amount, updatedTransaction.currency);
      navigation.navigate('Basic');
      screenProps.goHome();
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
    const { isDateOpen, isTagsOpen, localTags } = this.state;
    const { tags, addTag, navigation } = this.props;
    return (
      <ScrollView>
      <View style={[commonStyles.container, {opacity: (isDateOpen || isTagsOpen) ? 0.5 : 1}]}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        {/* Tags Mod */}
        <View style={commonStyles.space}>
          <Text style={commonStyles.detailTitle}>Tags</Text>
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
                console.log(this.state.localTags.length);
                if(this.state.localTags.length < 5){
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
              onPress={() => navigation.navigate('More')}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tags);