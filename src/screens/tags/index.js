import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {removeTag, addTag} from '../../state/tags/actions';
import commonStyles from '../../utilities/common-styles';
import SwipeCard from '../../components/transactions-card/swipeable-card';

const Tags = ({
    addTag,
    removeTag,
    tags
}) => (
    <View style={commonStyles.container}>
        <View style={commonStyles.space}>
          <Text style={commonStyles.detailTitle}>Your tags</Text>
        </View>
        <View style={[commonStyles.space, {alignItems: 'center'}]}>
            <FlatList 
              data={tags}
              keyExtractor={(_item, index) => (index).toString()}
              renderItem = {
                ({item, index})=>(
                <SwipeCard>
                    <TouchableOpacity onPress={() => this.removeTagFromLocal(index)} style={[commonStyles.regRow, {marginTop: 5, height: 30}]}>
                        <View style={[styles.tagColor, {backgroundColor: item.color, marginRight: 5}]} />
                        <Text style={{fontSize: 15}}>{item.name}</Text>
                    </TouchableOpacity>
                </SwipeCard>
                )
              }
            />
        </View>
    </View>
);

const mapStateToProps = ({tags}) => ({
  tags
});

const mapDispatchToProps = {
  removeTag,
  addTag 
};
  
export default connect(mapStateToProps, mapDispatchToProps)(History);
