import { GET_NEWS, SET_LOADING, NEWS_ERROR } from './types'
import axios from 'axios'

export const getNews = () => dispatch => {
    setLoading()
    axios.get('api/news').then(res => {
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


  // Set Loading
  export const setLoading = () => async dispatch => {
    dispatch({
      type: SET_LOADING
    });
  };
