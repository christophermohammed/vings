import AsyncStorage from '@react-native-community/async-storage';

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

export const getPhotosFromAsync = async () => {
  let photos = await AsyncStorage.getItem("photos");
  let ps = JSON.parse(photos);
  if(ps !== null){
    return(ps);
  }else{
    return([]);
  }
}

export const setUser = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export const setTransactions = async (transactions) => {
  await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
}

export const setPhotosToAsync = async (photos) => {
  await AsyncStorage.setItem("photos", JSON.stringify(photos));
}