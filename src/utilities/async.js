import { AsyncStorage } from 'react-native';

export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

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

export const setUser = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export const getPhotosFromAsync = async (setPhotos) => {
  let photos = await AsyncStorage.getItem("photos");
  let ps = JSON.parse(photos);
  if(ps !== null){
    setPhotos(ps);
  }else{
    setPhotos([]);
  }
}

export const setPhotosToAsync = async (photos) => {
  await AsyncStorage.setItem("photos", JSON.stringify(photos));
}