import { getItemFromAsync } from './async';
import { getPhotosFromAzure } from './cloud';
import { getCurrencyFromCode } from './currencies';
import defaultCurrencies from '../data/currencies';

export default startup = async (
    updatePhotos, 
    updateUser, 
    updateTransactions, 
    updateCurrencies, 
    updateTags, 
    navigation
  ) => {
    // get data from storage
    let transactions = await getItemFromAsync("transactions", []);
    let currencies = await getItemFromAsync("currencies", defaultCurrencies);
    let user = await getItemFromAsync("user");
    let photos = await getPhotosFromAzure();
    let tags = await getItemFromAsync("tags", []);
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
    // navigate
    if(!user.age){
      navigation.navigate("Setup");
    }else{
      navigation.navigate("Main");
    }
}