import React from 'react';
import { View, Text, Picker, TouchableWithoutFeedback } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../utilities/common-styles';
import pickerStyle from './styles';
import { Colors, isIOS } from '../../utilities';

class MWIPicker extends React.Component {
  constructor(){
    super();
    this.state = {isOpen: true};
  }

  toggleIsOpen = () => {
    this.setState((prevState) => {
      return{isOpen: !prevState.isOpen};
    });
  }

  render(){
    let { message, items } = this.props;
    let {isOpen} = this.state;

    return(
      <View>
        <TouchableWithoutFeedback
          onPress={this.toggleIsOpen}
          style={{height: 30}}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.question}>{message}</Text>
            <Icon
              name={isOpen ? "ios-arrow-up" : "ios-arrow-down"}
              size={30}
              color={Colors.main}
            />
          </View>
        </TouchableWithoutFeedback>
        {isOpen &&
          <View style={{alignItems: 'center', marginBottom: isIOS() ? 30 : -30}}>
            <WheelPicker
              data={items}
              selectedItem={this.props.selectedValue}
              onItemSelected={
                (index) => {
                  this.props.onChange(index)
                }
              }
            />
          </View>
        }
      </View>
    );
  }
}

export default MWIPicker;