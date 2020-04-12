import {
    GET_CAR,
    ADD_CAR,
    REMOVE_CAR,
    CAR_LOADING
} from '../actions/types';
import axios from 'axios';
import { getErrors } from './errorActions';

export const getCar = () => (dispatch, getState) => {
    dispatch({ type: CAR_LOADING });

    axios.get("/api/car", tokenConfig(getState))
    .then(car => {
        dispatch({ 
            type: GET_CAR,
            payload: car.data    
        });
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status));
    });
};

export const addCar = ({ name }) => (dispatch, getState) => {
    dispatch({ type: CAR_LOADING });

    const newItem = {
        name,
        owner: getState().auth.user._id
    };

    const body = JSON.stringify(newItem);

    axios.post("/api/car", body, tokenConfig(getState))
    .then(item => {
        dispatch({ 
            type: ADD_CAR,
            payload: item.data
         });
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status));
    });
};

export const removeCar = (id) => (dispatch, getState) => {
    dispatch({ type: CAR_LOADING });

    axios.delete(`/api/car/${id}`, tokenConfig(getState))
    .then(response => {
        dispatch({ 
            type: REMOVE_CAR, 
            payload: id
        })
    })
    .catch(err => {
        dispatch(getErrors(err.response.data.msg, err.response.status));
    })
};

const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if(token) config.headers['auth-token'] = token;

    return config;
}