import { getItemFromAsync } from './async';

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

export const getRatesFromAzure = async () => {
  let url = 'https://currencyservice2019.azurewebsites.net/api/GetRates?code=XYLaADC2dIJ2a6ifGolV2rZo/R7l7QCSaFAEu9VebAwU90PjC2YSqg==';
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
      let fromAzure = JSON.parse(resJson);
      return(fromAzure);
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
      body: JSON.stringify(user),
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
        ...transaction
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
