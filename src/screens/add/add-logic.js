import AsyncStorage from '@react-native-community/async-storage';
import { getTransactions, getUser, setUser } from '../../utilities/async';
import { saveTransactionToAzure } from '../../utilities/cloud';
import { emptyRegex } from '../../utilities/utils';

export const buildTransaction = (description, location, amt, type) => {
  // amount valid
  if(!isNaN(amt) && amt > 0){
    // description valid
    if(!(emptyRegex.test(String(description)))){
      // location valid
      if(
          ((!(emptyRegex.test(String(description)))) && type === transactionType.cost) ||
          (type === transactionType.savings) 
        ){
        // flip if cost
        if(type === transactionType.cost){
          amt *= -1;
        }
        // build transaction
        let transaction = {
          description: description,
          location: location,
          amount: amt.toString(),
          date: new Date().toDateString(),
          uid: ""
        }
        return transaction;
      } else {
        alert("Please enter a valid location.");
      }
    }else{
      alert("Please enter a valid description.");
    }
  }else{
    alert("Please enter a valid amount.");
  }
  return null;
}

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