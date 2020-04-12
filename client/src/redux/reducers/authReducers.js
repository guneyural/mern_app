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

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: {}
};

export default function(state = initialState, action){
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: {}
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        default: 
            return state
    }
}