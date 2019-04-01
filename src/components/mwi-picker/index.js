import React from 'react';
import { View, Text, Picker, Platform, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../utilities/common-styles';
import pickerStyle from './styles';
import { Colors } from '../../utilities/utils';

class MWIPicker extends React.Component {
  constructor(){
    super();
    this.state = {isOpen: false};
  }

  toggleIsOpen = () => {
    this.setState((prevState) => {
      return{isOpen: !prevState.isOpen};
    });
  }

  render(){
    let pickerList = this.props.items.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    let { message } = this.props;
    let {isOpen} = this.state;

    return(
      <View>
        <TouchableWithoutFeedback 
          onPress={this.toggleIsOpen}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.question}>{message}</Text>
            {Platform.OS === 'ios' &&
              <Icon 
                name={isOpen ? "ios-arrow-up" : "ios-arrow-down"}
                size={30}
                color={Colors.dark}
              />
            }
          </View>
        </TouchableWithoutFeedback>
        {((Platform.OS === 'ios' && isOpen) || Platform.OS !== 'ios') &&
          <View style={{alignItems: 'center'}}>
            <Picker
                selectedValue={this.props.selectedValue}
                onValueChange={
                    (itemValue) => {
                      this.props.onChange(itemValue) 
                    }
                }
                style={pickerStyle.picker}
            >
              {pickerList}
            </Picker>
          </View>
        }
      </View>
    );
  }
}

export default MWIPicker;