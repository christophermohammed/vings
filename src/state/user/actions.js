import * as actionTypes from '../actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { saveUserToAzure } from '../../utilities/cloud';

export const updateUser = (newUser) => async dispatch => {
    let uid = await saveUserToAzure(newUser);
    newUser.uid = uid;
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    dispatch({
        type: actionTypes.UPDATE_USER,
        payload: {
            user: newUser
        }
    });
}