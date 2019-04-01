import { setUser } from '../../utilities/async';
import { saveUserToAzure } from '../../utilities/cloud';

export const saveUser = async (user) => {
  let uid = await saveUserToAzure(user);
  user.uid = uid;
  await setUser(user);
}