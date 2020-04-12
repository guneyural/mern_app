import { combineReducers } from 'redux';
import authReducers from './authReducers';
import errorReducers from './errorReducers';
import carReducers from './carReducer';

export default combineReducers({
    auth: authReducers,
    error: errorReducers,
    car: carReducers
});