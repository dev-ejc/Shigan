import { GET_NEWS, SET_LOADING, NEWS_ERROR } from '../types'
import axios from 'axios'

export const getNews = () => dispatch => {
    setLoading()
    axios.get('api/news').then(res => {
        console.log(res.data)
        dispatch({
            type: GET_NEWS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type:NEWS_ERROR,
            payload: err
        })
    })
}

//@TODO reformat get requests to utilize params header
export const getNewsTopic = (topic) => dispatch => {
    setLoading()
    axios.get(`api/news:${topic}`).then(res => {
        console.log(res.data)
        dispatch({
            type: GET_NEWS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type:NEWS_ERROR,
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