import { GET_PRICE, SET_LOADING, PRICE_ERROR } from './types'
import axios from 'axios'

export const getPrice = (ticker) => dispatch => {
    setLoading()
    axios.get(`api/prices/${ticker}`).then(res => {
        console.log(res.data)
        dispatch({
            type: GET_PRICE,
            payload: res.data["Global Quote"]
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