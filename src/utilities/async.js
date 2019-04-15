import AsyncStorage from '@react-native-community/async-storage';

export const clearAsync = async () => {
  await AsyncStorage.clear();
}

export const getItemFromAsync = async (key, defaultValue) => {
  let item = await AsyncStorage.getItem(key);
  if(item !== null){
    return JSON.parse(item);
  }else{
    return defaultValue;
  }
}

export const setItemToAsync = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}