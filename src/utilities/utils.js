import { Dimensions, AsyncStorage } from 'react-native';

export const Colors = {
    main: '#4a69bd',
    red: '#eb4d4b',
    green: '#6ab04c',
    secondary: '#1e3799',
    soft: '#f3ffff'
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

export const getTransactions = async () => {
  let transactions = await AsyncStorage.getItem("transactions");
  if(transactions !== null){
    return JSON.parse(transactions);
  }else{
      return [];
  }
}

export const getUser = async () => {
  let user = await AsyncStorage.getItem("user");
  if(user !== null){
    return JSON.parse(user);
  }else{
      return {};
    }
}

export const getDate = async () => {
  let date = await AsyncStorage.getItem("date");
  if(date !== null){
    return date;
  }else{
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toString();
  }
}

export const setDate = async (date) => {
  await AsyncStorage.setItem("date", date);
}
