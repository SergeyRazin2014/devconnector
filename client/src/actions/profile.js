import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_PROFILES,
    CLEAR_PROFILE,
    GET_REPOS
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

        console.error(err);

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get all profiles
export const getProfiles = () => async dispatch => {

    dispatch({ type: CLEAR_PROFILE }); //ЭТО ДЕЛАЕМ НА ВСЯКИЙ СЛУЧАЙ, МОЖЕТ ЭТО И НЕ НУЖНО

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {

        console.error(err);

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get profile by ID (получить профиль по userID)
export const getProfileById = (userId) => async dispatch => {

    dispatch({ type: CLEAR_PROFILE }); //ЭТО ДЕЛАЕМ НА ВСЯКИЙ СЛУЧАЙ, МОЖЕТ ЭТО И НЕ НУЖНО

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {

        console.error(err);

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get GitHub repos
export const getGitHubRepos = (username) => async dispatch => {


    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (err) {

        console.error(err);

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


//Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');

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

//Add Education
export const addEducation = (formData, history) => async dispatch => {

    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');

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

//Delete Experience
export const deleteExperience = (expId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${expId}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experiene Deleted', 'success'));
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

//Delete Education
export const deleteEducation = (educId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${educId}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Deleted', 'success'));
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
