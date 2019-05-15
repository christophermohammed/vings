import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../utilities/common-styles';
import Icon from 'react-native-vector-icons/Ionicons';

const MWITextInput = (props) => {
  const {
    message, 
    value, 
    keyboardType, 
    width, 
    height = 40, 
    placeholder = "", 
    multiline = false, 
    borderColor,
    isPassword,
    textContentType,
    autoComplete,
    alignSelf,
    editable,
    noClear,
    maxLength
  } = props;

  return (
    <View>
      <View style={{marginBottom: 5}}>
        <Text style={styles.question}>{message}</Text>
      </View>
      <View style={[styles.inputStyle, {flexDirection: 'row', width}]}>
        <View style={{borderColor, flex: 1}}>
          <TextInput
            ref={input => props.getRef(input)}
            style={{textAlignVertical: 'top', marginLeft: 10, height, width: noClear ? width : width - 35}}
            onChangeText={(text) => props.onChange(text)}
            placeholder={placeholder}
            clearTextOnFocus={true}
            value={value}
            returnKeyType="done"
            keyboardType={keyboardType}
            multiline={multiline}
            secureTextEntry={isPassword ? true : false}
            textContentType={textContentType}
            autoComplete={autoComplete}
            alignSelf={alignSelf}
            editable={editable}
            maxLength={maxLength}
          />
        </View>
        {!noClear &&
          <View style={[styles.center, {marginRight: 5, height}]}>
            <Icon 
              name="ios-close-circle-outline"
              color={'gray'}
              size={30}
              onPress={() => props.onChange('')}
            />
          </View>
        }
      </View>
    </View>
  );
}

export default MWITextInput;