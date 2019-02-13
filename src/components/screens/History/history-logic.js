import { getUser, setUser } from "../../../utilities/async";

export const removeFromAzure = async (uid) => {
  let user = await getUser();
  let url = 'https://vingsazure.azurewebsites.net/api/RemoveTransaction/';
  try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserUID: user.uid,
          transactionUID: uid 
          }),
      });
      let resJson = await response.json();
    } catch (error) {
    console.error(error);
  }
}

export const updateUserNetSav = async (amt) => {
  let user = await getUser();
  user.netSav -= amt;
  await setUser(user);
}