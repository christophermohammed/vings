import React, { Component } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {removeTag, addTag} from '../../state/tags/actions';
import commonStyles from '../../utilities/common-styles';
import SwipeCard from '../../components/transactions-card/swipeable-card';
import { Colors, SCREEN_WIDTH } from '../../utilities';
import TagsModal from '../../components/tags-modal';
import { removeTagFromTransactions } from '../../state/transactions/actions';

class Tags extends Component {
  constructor(){
    super();

    this.state = {isTagsOpen: false};
  }

  render(){
    const { addTag, removeTag, tags, navigation, removeTagFromTransactions } = this.props;
    const { isTagsOpen } = this.state;
    return(
      <React.Fragment>
        <View style={commonStyles.center}>
          <TagsModal 
            tags={tags}
            visible={isTagsOpen}
            closeTagsModal={() => this.setState({isTagsOpen: false})}
            addTag={addTag}
          />
        </View>
      <View style={commonStyles.container}>
        <View style={commonStyles.space}>
          <Text style={commonStyles.detailTitle}>Your tags</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FlatList 
            data={tags}
            keyExtractor={(_item, index) => (index).toString()}
            renderItem = {({item, index}) => (
              <SwipeCard 
                item={item}
                index={index}
                remove={(item, rowKey) => {
                  removeTag(rowKey);
                  removeTagFromTransactions(item);
                }}
                renderCard={() => (
                  <View style={[commonStyles.center, {height: 50, width: SCREEN_WIDTH, backgroundColor: 'white', flexDirection: 'row'}]}>
                    <View style={[styles.tagColor, {backgroundColor: item.color, marginRight: 5}]} />
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                  </View>
                )}
              />)
            }
          />
        </View>
        <View style={commonStyles.center}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Add New Tag"
              onPress={() => {
                if(tags.length < 11){
                  this.setState({isTagsOpen: true});
                }else{
                  alert("You already have the maximum number of tags");
                }
              }}
              color={Colors.main}
            />
          </View>
        </View>
        <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15}]}>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Back"
              onPress={() => navigation.navigate('Settings')}
              color={Colors.main}
            />
          </View>
          <View style={{ borderRadius: 10}}>
            <Button
              title="Save"
              onPress={() => navigation.navigate('Settings')}
              color={Colors.main}
            />
          </View>
        </View>
      </View>
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  tagColor: {
    height: 20, 
    width: 20, 
    borderRadius: 10,  
  }
});

const mapStateToProps = ({tags}) => ({
  tags
});

const mapDispatchToProps = {
  removeTag,
  addTag,
  removeTagFromTransactions 
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Tags);
