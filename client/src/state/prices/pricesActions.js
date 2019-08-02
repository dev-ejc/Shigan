import { GET_PRICES, SET_LOADING, PRICE_ERROR } from './types'
import axios from 'axios'

//@TODO possible breakpoint
export const getPrices = id => dispatch => {
    setLoading()
    axios.get(`api/prices/${id}`).then(res => {
        dispatch({
            type: GET_PRICES,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type:PRICE_ERROR,
            payload: err
        })
    })
}

// Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }    
}