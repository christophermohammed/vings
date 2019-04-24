import React from 'react';
import { Text, View, Modal, Button } from 'react-native';
import {DatePicker} from 'react-native-wheel-picker-android';
import commonStyles from '../../utilities/common-styles';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utilities';

const DateModal = (props) => {
    const { visible, closeDateModal, setDate } = props;
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={[{backgroundColor: 'rgba(255, 255, 255, 0.9)', height: SCREEN_HEIGHT, width: SCREEN_WIDTH}]}>
                <View style={commonStyles.space}>
                    <DatePicker 
                      onDateSelected={setDate}
                      hideHours
                      hideMinutes
                      hideAm
                    />
                </View>
                <View style={[styles.space, {flexDirection: 'row', justifyContent: 'space-around', marginRight: 15, marginLeft: 15}]}>
                  <View style={{ borderRadius: 10}}>
                    <Button
                      title="Cancel"
                      onPress={closeDateModal}
                      color={Colors.main}
                    />
                  </View>
                  <View style={{ borderRadius: 10}}>
                    <Button
                      title="Select"
                      onPress={closeDateModal}
                      color={Colors.main}
                    />
                  </View>
                </View>
            </View>
        </Modal>
    );
}

export default DateModal;
