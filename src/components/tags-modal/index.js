import React from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native';
import MWITextInput from '../../components/mwi-text-input';
import commonStyles from '../../utilities/common-styles';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, placeholders, emptyRegex, contains } from '../../utilities';

class TagsModal extends React.Component {
    constructor(){
        super();
        this.state = {
          name: '',
          color: '',
        }
    }

    isAlreadyATag = (tags, name, color) => {
        var i = tags.length;
        while (i--) {
          if (tags[i].name === name && tags[i].color === color) {
            return true;
          }
        }
        return false;
    }

    render(){
        const { visible, closeTagsModal, addTag, tags } = this.props;
        const { name, color } = this.state;
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
            >
                <View style={commonStyles.modalBG}>
                    <View style={[commonStyles.center, {marginTop: SCREEN_HEIGHT / 9}]}>
                        <View style={[commonStyles.regRow, {marginTop: 5, height: 50}]}>
                          <View style={[styles.tagColor, {backgroundColor: color, marginRight: 10}]}></View>
                          <Text style={{fontSize: 30}}>{name}</Text>
                        </View>
                    </View>
                    <View style={commonStyles.space}>
                       <MWITextInput 
                          message="What do you want to name your tag?"
                          placeholder={placeholders.name}
                          value={name}
                          onChange={name => this.setState({name})}
                          getRef={n => { this.nameInput = n }}
                          width={SCREEN_WIDTH - 20}
                          maxLength={20}
                       />
                    </View>
                    <View style={commonStyles.space}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
                            <TouchableOpacity onPress={() => this.setState({color: Colors.tagRed})} style={[styles.tagColor, {backgroundColor: Colors.tagRed}]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({color: Colors.tagOrange})} style={[styles.tagColor, {backgroundColor: Colors.tagOrange}]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({color: Colors.tagYellow})} style={[styles.tagColor, {backgroundColor: Colors.tagYellow}]}></TouchableOpacity>
                        </View> 
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                            <TouchableOpacity onPress={() => this.setState({color: Colors.tagGreen})} style={[styles.tagColor, {backgroundColor: Colors.tagGreen}]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({color: Colors.tagBlue})} style={[styles.tagColor, {backgroundColor: Colors.tagBlue}]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({color: Colors.tagViolet})} style={[styles.tagColor, {backgroundColor: Colors.tagViolet}]}></TouchableOpacity>
                        </View>                        
                    </View>
                    <View style={[styles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 10}]}>
                        <View style={{ borderRadius: 10}}>
                          <Button
                            title="Cancel"
                            onPress={closeTagsModal}
                            color={Colors.main}
                          />
                        </View>
                        <View style={{borderRadius: 10}}>
                          <Button
                            title="Add"
                            onPress={() => {
                              if(color !== ''){
                                if(!(emptyRegex.test(String(name)))){
                                    if(!this.isAlreadyATag(tags, name, color)){
                                        this.setState({name: '', color: ''});
                                        addTag({name, color});
                                        closeTagsModal();
                                    }else{
                                        alert('Seems like you laready have a tag like that')
                                    }
                                }else{
                                    alert('Please enter a valid name');
                                }
                              }else{
                                alert('Please select a colour');
                              }
                            }}
                            color={Colors.main}
                          />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
  tagColor: {
    height: 40, 
    width: 40, 
    borderRadius: 20,
    overflow: 'hidden'   
  }
});

export default TagsModal;
