import { emptyRegex, getGUID } from '../../utilities/utils';
import { transactionType } from '../../utilities/data';

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
        let date = new Date();
        // build transaction
        let transaction = {
          description: description,
          location: location,
          amount: amt,
          date,
          dateString: date.toDateString(),
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