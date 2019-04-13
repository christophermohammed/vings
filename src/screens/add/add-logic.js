import { emptyRegex, getGUID } from '../../utilities/utils';
import { transactionType } from '../../utilities/terms';

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