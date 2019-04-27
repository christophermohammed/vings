import React from 'react';
import { View, Text, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native';
import MWITextInput from '../../components/mwi-text-input';
import commonStyles from '../../utilities/common-styles';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, placeholders } from '../../utilities';

class TagsModal extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            color: '',
        }
    }

    render(){
        const { visible, closeTagsModal, addTag } = this.props;
        const { name, color } = this.state;
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
            >
                <View style={commonStyles.modalBG}>
                    <View style={commonStyles.center}>
                        <View style={[commonStyles.regRow, {marginTop: 5, height: 50}]}>
                          <View style={[styles.tagColor, {backgroundColor: color}]}></View>
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
                    <View style={[styles.space, {flexDirection: 'row', justifyContent: 'space-around', marginRight: 15, marginLeft: 15}]}>
                        <View style={{ borderRadius: 10}}>
                          <Button
                            title="Cancel"
                            onPress={closeTagsModal}
                            color={Colors.main}
                          />
                        </View>
                        <View style={{borderRadius: 10}}>
                          <Button
                            title="Select"
                            onPress={() => {
                              addTag({name, color});
                              closeTagsModal();
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
        borderRadius: 40,   
    }
});

export default TagsModal;
