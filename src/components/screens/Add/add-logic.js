import { AsyncStorage } from 'react-native';
import { getTransactions, getUser, setUser } from '../../../utilities/async';
import { transactionType } from '../../../utilities/terms';
import { saveTransactionToAzure } from '../../../utilities/cloud';

export const saveTransaction = async (transaction) => {
    //get transactions and user from async
    let transactions = await getTransactions();
    let user = await getUser();
    
    // save to azure and get uid
    let uid = await saveTransactionToAzure(transaction, user.uid);
    transaction.uid = uid;
    
    //add to transactions
    transactions.unshift(transaction);
    await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
    
    //update user net savings
    user.netSav += parseFloat(transaction.amount);
    await setUser(user);
}

export const amtSafeToSave = (amt) => {
  if(isNaN(amt) || amt < 0){
    return false;
  }else{
    return true;
  }
}

export const desSafeToSave = (des) => {
  if(des === ""){
    return false;
  }else{
    return true;
  }
}

export const locSafeToSave = (loc, type) => {
  if(loc === "" && type === transactionType.cost){
    return false;
  }else{
    return true;
  }
}     