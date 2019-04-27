import React from 'react';
import { Text, View, Modal, Button } from 'react-native';
import {DatePicker} from 'react-native-wheel-picker-android';
import commonStyles from '../../utilities/common-styles';
import { Colors } from '../../utilities';

const DateModal = (props) => {
    const { visible, closeDateModal, setDate } = props;
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={[commonStyles.modalBG, {alignItems: 'center'}]}>
                <View style={commonStyles.space}>
                  <DatePicker
                    mode="date" 
                    onDateSelected={setDate}
                    hideHours
                    hideMinutes
                    hideAm
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
