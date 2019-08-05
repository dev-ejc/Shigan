import { GET_PRICES, SET_LOADING, PRICE_ERROR, ADD_PRICE, REMOVE_PRICE } from './types'
import axios from 'axios'

//@TODO possible breakpoint
export const getPrices = id => dispatch => {
    setLoading()
    const abortController = new AbortController();
    const signal = abortController.signal;
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      signal
    };
    axios.get(`api/prices/${id}`,config).then(res => {
        console.log(res.data)
        dispatch({
            type: GET_PRICES,
            payload: res.data
        })
        abortController.abort();
    }).catch(err => {
        dispatch({
            type:PRICE_ERROR,
            payload: err
        })
        abortController.abort();
    })
}

//@TODO possible breakpoint
export const addPrice = ticker => dispatch => {
    setLoading()
    const abortController = new AbortController();
    const signal = abortController.signal;
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      signal
    };
    axios.get(`api/prices/ticker/${ticker}`,config).then(res => {
        console.log(res.data)
        dispatch({
            type: ADD_PRICE,
            payload: res.data
        })
        abortController.abort();
    }).catch(err => {
        dispatch({
            type:PRICE_ERROR,
            payload: err
        })
        abortController.abort();
    })
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }    
}