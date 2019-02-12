import { AsyncStorage } from 'react-native';
import { setDate } from '../../../utilities/utils';

export const saveUser = async (user) => {
  let uid = await saveUserToAzure(user);
  user.uid = uid;
  await AsyncStorage.setItem("user", user);
  await setDate("");
}

const saveUserToAzure = async (user) => {
  let url = 'https://vingsazure.azurewebsites.net/api/CreateUser/';
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: user.age,
        gender: user.gender
        }),
    });
    let responseJson = await response.json();
    let fromAzure = JSON.stringify(responseJson);
    let length = fromAzure.length; 
    let uid = fromAzure.substring(1,length-1);
    return(uid);
  } catch (error) {
    console.error(error);
    return("err");
  }
}