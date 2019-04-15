import { getUser } from './async';

export const getPhotosFromAzure = async () => {
  let url = 'https://vingsgallery.azurewebsites.net/api/GetPhotos?code=bAVDlZbfCJtiu5rDbk2DWBpVC95KvwnRqgoSHseEjw/77XXgOdzFdA==';
  try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      let resJson = await response.json();
      let fromAzure = JSON.parse(JSON.stringify(resJson));
      return(fromAzure.photos);
    } catch (error) {
      console.error(error);
  }
}

export const saveUserToAzure = async (user) => {
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

export const removeTransactionFromAzure = async (uid) => {
  let user = await getItemFromAsync("user");
  let url = 'https://vingsazure.azurewebsites.net/api/RemoveTransaction/';
  try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserUID: user.uid,
          transactionUID: uid 
          }),
      });
      let resJson = await response.json();
    } catch (error) {
    console.error(error);
  }
}

export const saveTransactionToAzure = async (transaction, userUID) => {
  let url = 'https://vingsazure.azurewebsites.net/api/CreateTransaction/';
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          UserUID: userUID,
          description: transaction.description,
          location: transaction.location,
          amount: (transaction.amount).toString(),
          date: transaction.date
        }),
    });
    let responseJson = await response.json();
    let fromAzure = JSON.stringify(responseJson);
    let length = fromAzure.length; 
    let uid = (fromAzure.substring(1,length-1));
    return(uid);
  } catch (error) {
    console.error(error);
    return("err");
  }
} 
