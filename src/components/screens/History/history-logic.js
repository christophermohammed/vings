import { getUser, setUser } from "../../../utilities/async";

export const updateUserNetSav = async (amt) => {
  let user = await getUser();
  user.netSav -= amt;
  await setUser(user);
}