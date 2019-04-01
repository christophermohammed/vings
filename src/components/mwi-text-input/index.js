import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../utilities/common-styles';

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
    autoComplete
  } = props;

  return (
    <View>
      <View style={{marginBottom: 5}}>
        <Text style={styles.question}>{message}</Text>
      </View>
      <TextInput
        ref={input => props.getRef(input)}
        style={[styles.inputStyle, {width, height, textAlignVertical: 'top', borderColor}]}
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
      />
    </View>
  );
}

export default MWITextInput;