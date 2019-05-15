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
        <View style={commonStyles.modalBG}>
          <View style={[commonStyles.space, {alignItems: 'center'}]}>
            <DatePicker
              mode="date" 
              onDateSelected={setDate}
              hideHours
              hideMinutes
              hideAm
            />
          </View>
          <View style={[commonStyles.space, {flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10}]}>
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
