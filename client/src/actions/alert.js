import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => (dispatch) => {
    const id = uuid.v4();

    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    //ДЕЛАЕМ ИСЧЕЗНОВЕНИЕ АЛЕРТА ЧЕРЕЗ 5 СЕКУНД
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
}