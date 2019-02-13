import { AsyncStorage } from 'react-native';

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
    return "";
  }
}

export const setUser = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export const setDate = async (date) => {
  await AsyncStorage.setItem("date", date);
}

export const getPhotosFromAsync = async (setPhotos) => {
  let photos = await AsyncStorage.getItem("photos");
  let ps;
  if(photos !== null){
    ps = photos;
  }else{
    ps = [];
  }
  setPhotos(ps);
}

export const setPhotosToAsync = async (photos) => {
  await AsyncStorage.setItem("photos", photos);
}