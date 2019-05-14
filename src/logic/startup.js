import { getItemFromAsync } from './async';
import { getPhotosFromAzure, getRatesFromAzure } from './cloud';
import { getCurrencyFromCode } from './currencies';
import defaultCurrencies from '../data/currencies';

export default startup = async (
    updatePhotos, 
    updateUser, 
    updateTransactions, 
    updateCurrencies, 
    updateTags,
    updateRates, 
    navigation
  ) => {
  // get data from storage
  let transactions = await getItemFromAsync("transactions", []);
  let currencies = await getItemFromAsync("currencies", defaultCurrencies);
  let user = await getItemFromAsync("user");
  let tags = await getItemFromAsync("tags", []);
  // get from cloud
  let photos = await getPhotosFromAzure();
  let rates = await getRatesFromAzure();
  // handle backwards compat
  if(user && user.currency !== undefined){
    user.currencyCode = "USD";
    transactions.map(function(tr) { 
      tr.amount = parseFloat(tr.amount);
      tr.dateString = tr.date;
      tr.date = new Date(tr.dateString);
      tr.currency = getCurrencyFromCode(user.currencyCode, currencies);
      return tr
    });
  }
  // set state
  updatePhotos(photos);
  updateUser(user);
  updateTransactions(transactions);
  updateCurrencies(currencies);
  updateTags(tags);
  updateRates(rates);
  // navigate
  if(user === undefined){
    navigation.navigate("Setup");
  }else{
    navigation.navigate("Main");
  }
}