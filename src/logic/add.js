import { emptyRegex, getGUID } from '../utilities';
import { transactionType } from '../utilities';

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
          amount: amt,
          uid: getGUID()
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