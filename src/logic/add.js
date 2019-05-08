import { emptyRegex, getGUID } from '../utilities';
import { transactionType } from '../utilities';
import { isACurrencyName } from './currencies';

export const buildBasicTransaction = (description, location, amt, type) => {
  let transaction = {};
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
        transaction = {
          description: description,
          location: location,
          amount: amt,
          uid: getGUID()
        }
      } else {
        alert("Please enter a valid location.");
      }
    }else{
      alert("Please enter a valid description.");
    }
  }else{
    alert("Please enter a valid amount.");
  }
  return transaction;
}

export const buildRestOfTransaction = (transaction, currency, date) => {
  let updatedTransaction = null;
  if(date){
    if(currency && currency.name && isACurrencyName(`${currency.name} (${currency.code})`)){
      updatedTransaction = {
        ...transaction,
        currency,
        date,
        dateString: date.toDateString(),
      };
    }else{
      alert("Please select a valid currency");
    }
  }else{
    alert("Please select a valid date");
  }
  return updatedTransaction;
}