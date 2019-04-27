import React from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {removeTag, addTag} from '../../state/tags/actions';
import commonStyles from '../../utilities/common-styles';
import SwipeCard from '../../components/transactions-card/swipeable-card';
import { Colors, SCREEN_WIDTH } from '../../utilities';

const Tags = ({
    addTag,
    removeTag,
    tags,
    navigation
}) => (
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
              remove={rowKey => removeTag(rowKey)}
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
      <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10}]}>
        <View style={{ borderRadius: 10}}>
          <Button
            title="Go Back"
            onPress={() => navigation.navigate('Settings')}
            color={Colors.main}
          />
        </View>
        <View style={{ borderRadius: 10}}>
          <Button
            title="Add Tag"
            onPress={this.save}
            color={Colors.main}
          />
        </View>
      </View>
    </View>
);

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
  addTag 
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Tags);
