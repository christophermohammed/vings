import { getItemFromAsync } from './async';
import { getPhotosFromAzure, getRatesFromAzure } from './cloud';
import { getCurrencyFromCode } from './currencies';
import defaultCurrencies from '../data/currencies';
import {isString, transactionType} from '../utilities';
import { bcTransactions, bcUser } from '../data/backwards-compat';

export default startup = async (
    updatePhotos, 
    updateUser, 
    updateTransactions, 
    updateCurrencies, 
    updateTags,
    updateRates,
    addToNetSav, 
    navigation
  ) => {
  // get data from storage
  let transactions = await getItemFromAsync("transactions", []);
  let user = await getItemFromAsync("user");
  let currencies = await getItemFromAsync("currencies", defaultCurrencies);
  let tags = await getItemFromAsync("tags", []);
  // get from cloud
  let photos = await getPhotosFromAzure();
  let rates = await getRatesFromAzure();
  // set state
  updatePhotos(photos);
  updateCurrencies(currencies);
  updateTags(tags);
  updateRates(rates);
  // handle backwards compat
  if(user && isString(user.currency)){
    user.currency = null;
    user.currencyCode = "USD";
    user.country = "United States of America";
    user.age = parseInt(user.age);
    transactions.map(function(tr) { 
      tr.description = tr.title || tr.description;
      tr.title = null;
      tr.amount = parseFloat(tr.amount);
      tr.dateString = tr.date;
      tr.date = new Date(tr.dateString);
      tr.tags = [];
      tr.type = tr.amount < 0 ? transactionType.cost : transactionType.savings;
      tr.currency = getCurrencyFromCode(user.currencyCode, currencies);
      addToNetSav(tr.amount, tr.currency);
      return tr
    });
  }
  updateUser(user);
  updateTransactions(transactions);
  // navigate
  if(user === undefined || user.currencyCode === undefined){
    navigation.navigate("Setup");
  }else{
    navigation.navigate("Main");
  }
}