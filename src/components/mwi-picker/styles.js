import { StyleSheet, Platform } from 'react-native';
import {SCREEN_WIDTH} from '../../utilities';

const pickerStyle = StyleSheet.create({
  picker: {
    width: Platform.OS === 'ios' ? SCREEN_WIDTH - 150 : SCREEN_WIDTH,
    height: Platform.OS === 'ios' ? 165 : 40,
    marginTop: Platform.OS === 'ios' ? -20 : 0
  }
});

export default pickerStyle;