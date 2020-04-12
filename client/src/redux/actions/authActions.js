import {
    USER_LOADING,
    USER_LOADED,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    REGISTER_FAIL,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS
} from '../actions/types';
import axios from 'axios';
import { getErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/api/user', configToken(getState))
    .then(user => {
        dispatch({ type: USER_LOADED, payload: user.data})
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status, 'LOAD_USER'));
        dispatch({ type: AUTH_ERROR });
    });
}

export const registerUser = ({username, email, password}) => dispatch => {
    dispatch({ type: USER_LOADING });
    const user = {
        username,
        email,
        password
    };

    const stringified = JSON.stringify(user);
    
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post('/api/user/register', stringified, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL'));
        dispatch({ type: REGISTER_FAIL });
    });
};

export const logoutUser = () => dispatch => {
    dispatch({ type: USER_LOADING });
    dispatch({ type: LOGOUT_SUCCESS });
}

export const loginUser = ({ email, password }) => dispatch => {
    dispatch({type: USER_LOADING});

    const body = {
        email,
        password
    };

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    axios.post('/api/user/login', body, config)
    .then(data => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data
        });
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL'));
        dispatch({type: LOGIN_FAIL});
    });
}

function configToken(getState) {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if(token) config.headers['auth-token'] = token;

    return config;
}