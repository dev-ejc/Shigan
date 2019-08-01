import { GET_PRICE, SET_LOADING, PRICE_ERROR } from './types'

const initialState = {
    price: null,
    loading:false,
    error:null
}

export default (state = initialState,action) => {
    switch(action.type) {
        case GET_PRICE:
            //Possible breakpoint
            return {
                ...state,
                price: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case PRICE_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}