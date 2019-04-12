import * as actionTypes from '../actionTypes';
import { saveUserToAzure } from '../../utilities/cloud';
import { setUser } from '../../utilities/async';

export const updateUser = (user) => async dispatch => {
    saveUserToAzure(user);
    setUser(user);
    dispatch({
        type: actionTypes.UPDATE_USER,
        payload: {
            user
        }
    });
}