import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        debugger;

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        let message = (edit === true) ? 'Profile Updated success' : 'Profile Created success';

        dispatch(setAlert(message));

        //если мы создали нвоый профиль - тогда редирект на /dashboard
        if (edit === false) {
            history.push('/dashboard');
        }

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger')); //ДЕЛАЕМ ДИСПАТЧ ДРУГОГО АКШЕНА ИЗ АКШЕНА РЕГИСТРАЦИИ
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

