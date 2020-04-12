import {
    GET_CAR,
    ADD_CAR,
    REMOVE_CAR,
    CAR_LOADING
} from '../actions/types';

const initialState = {
    cars: [],
    isLoading: false
};

export default function(state = initialState, action){
    switch(action.type) {
        case CAR_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ADD_CAR: 
            return {
                cars: [action.payload, ...state.cars],
                isLoading: false
            }
        case GET_CAR:
            return {
                cars: action.payload,
                isLoading: false
            }
        case REMOVE_CAR: 
            return {
                cars: [ ...state.cars.filter(car => car._id !== action.payload) ],
                isLoading: false
            }
        default: 
            return state
    }
}