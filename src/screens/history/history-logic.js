import { getUser, setUser } from "../../utilities/async";
import { removeTransactionFromAzure } from '../../utilities/cloud';
import AsyncStorage from '@react-native-community/async-storage';

const updateUserNetSav = async (amt) => {
  let user = await getUser();
  user.netSav -= amt;
  await setUser(user);
}

export const deleteTransaction = async (index, ts, setTransactions, toggleLoading) => {
  toggleLoading();
  //get uid from transaction to be removed ts[index].uid
  let uid = ts[index].uid;
  //get Amount
  let amt = parseFloat(ts[index].amount);
  //update user
  await updateUserNetSav(amt);
  //remove from azure using uid
  await removeTransactionFromAzure(uid);
  //splice array; remove transaction at index
  ts.splice(index, 1);
  //set ts
  await AsyncStorage.setItem("transactions", JSON.stringify(ts));
  //setState
  setTransactions(ts);
  toggleLoading();
}