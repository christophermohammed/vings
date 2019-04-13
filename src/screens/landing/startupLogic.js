import { getUser, getTransactions } from '../../utilities/async';
import { getPhotosFromAzure } from '../../utilities/cloud';

export default startup = async (updatePhotos, updateUser, updateTransactions, navigation) => {
    // get data from storage
    let transactions = await getTransactions();
    let user = await getUser();
    let photos = await getPhotosFromAzure();
    // handle backwards compat
    if(typeof(user.netSav) === "string"){
      user.netSav = parseFloat(user.netSav);
      transactions.map(function(tr) { 
        tr.amount = parseFloat(tr.amount);
        tr.dateString = tr.date;
        tr.date = new Date(tr.dateString);
        return tr
      });
    }
    // set state
    updatePhotos(photos);
    updateUser(user);
    updateTransactions(transactions);
    // navigate 
    if(!user.uid){
      navigation.navigate("Settings");
    }else{
      navigation.navigate("Vings");
    }
}