import { getItemFromAsync } from '../../utilities/async';
import { getPhotosFromAzure } from '../../utilities/cloud';
import { getCurrencyFromName, getCurrencyFromCode } from '../../utilities/currencies';
import { defaultCurrencies } from '../../utilities/currencies';

export default startup = async (updatePhotos, updateUser, updateTransactions, updateCurrencies, navigation) => {
    // get data from storage
    let transactions = await getItemFromAsync("transactions", []);
    let currencies = await getItemFromAsync("currencies", defaultCurrencies);
    let user = await getItemFromAsync("user");
    let photos = await getPhotosFromAzure();
    // handle backwards compat
    if(typeof(user.currency) === "string"){
      user.netSav = parseFloat(user.netSav);
      user.currencyCode = "USD";
      transactions.map(function(tr) { 
        tr.amount = parseFloat(tr.amount);
        tr.dateString = tr.date;
        tr.date = new Date(tr.dateString);
        tr.currency = getCurrencyFromCode(user.currencyCode);
        return tr
      });
    }
    // set state
    updatePhotos(photos);
    updateUser(user);
    updateTransactions(transactions);
    updateCurrencies(currencies);
    // navigate 
    if(!user.uid){
      navigation.navigate("Setup");
    }else{
      navigation.navigate("Main");
    }
}