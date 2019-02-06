import { Dimensions, AsyncStorage } from 'react-native';

export const Colors = {
    main: '#4a69bd',
    red: '#eb4d4b',
    green: '#6ab04c'
}

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const IMAGE_HEIGHT = SCREEN_HEIGHT / 2;

export const IMAGE_WIDTH = ((IMAGE_HEIGHT / 4) * 3);

export const to2Dp = (amt) => {
    return Math.round(amt * 100) / 100;
}

export const clearAsync = async () => {
  await AsyncStorage.clear();
}

