import { getItemFromAsync } from '../../utilities/async';
import { getPhotosFromAzure } from '../../utilities/cloud';
import { getCurrencyFromName } from '../../utilities/currencies';

export default startup = async (updatePhotos, updateUser, updateTransactions, navigation) => {
    // get data from storage
    let transactions = await getItemFromAsync("transactions", []);
    let user = await getItemFromAsync("user");
    let photos = await getPhotosFromAzure();
    // handle backwards compat
    if(typeof(user.currency) === "string"){
      user.netSav = parseFloat(user.netSav);
      user.currency = getCurrencyFromName('United States dollar (USD)');
      transactions.map(function(tr) { 
        tr.amount = parseFloat(tr.amount);
        tr.dateString = tr.date;
        tr.date = new Date(tr.dateString);
        tr.currency = user.currency;
        return tr
      });
    }
    // set state
    updatePhotos(photos);
    updateUser(user);
    updateTransactions(transactions);
    // navigate 
    if(!user.uid){
      navigation.navigate("Setup");
    }else{
      navigation.navigate("Main");
    }
}