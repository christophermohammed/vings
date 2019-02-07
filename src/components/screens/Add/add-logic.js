import { AsyncStorage } from 'react-native';
import { getTransactions, getUser } from '../../../utilities/utils';

export const saveTransaction = async (transaction) => {
    //get transactions and user from async
    let transactions = await getTransactions();
    let user = await getUser();
    
    // save to azure and get uid
    let uid = await saveToAzure(transaction, user.uid);
    transaction.uid = uid;
    
    //add to transactions
    transactions.unshift(transaction);
    await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
    
    //update user net savings
    user.netSav += parseFloat(transaction.amount);
    await AsyncStorage.setItem("user", JSON.stringify(user));
}

export const safeToSave = (amt) => {
    let clearToSave;
    if(isNaN(amt) || amt < 0){
      clearToSave = false;
    }else{
      clearToSave = true;
    }
    return clearToSave;
}

const saveToAzure = async (transaction, userUID) => {
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
          amount: transaction.amount,
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