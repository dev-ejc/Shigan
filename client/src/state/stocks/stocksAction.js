import  { ADD_STOCK, DELETE_STOCK, GET_STOCKS, CLEAR_STOCKS, SET_CURRENT_STOCK, CLEAR_CURRENT_STOCK, UPDATE_CURRENT_STOCK, FILTER_STOCKS, CLEAR_FILTER, SET_LOADING, STOCK_ERROR } from './types'
import axios from 'axios'

// @todo abstract api requests
export const getStocks = id => async dispatch => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = { signal };
  try {
    setLoading();
    const res = await axios.get(`/api/stocks/${id}`, config);
    dispatch({
      type: GET_STOCKS,
      payload: res.data
    });
    abortController.abort();
  } catch (err) {
    stockError(err, abortController);
  }
};

// Add Stock
export const addStock = (stock, id) => async dispatch => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    signal
  };
  try {
    setLoading();
    const res = await axios.post(`/api/stocks/${id}`, stock, config);
    dispatch({
      type: ADD_STOCK,
      payload: res.data
    });
  } catch (err) {
    stockError(err, abortController);
  }
};

// Delete Stock
export const deleteStock = id => async dispatch => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = { signal };
  try {
    setLoading();
    await axios.delete(`api/stocks/${id}`, config);
    dispatch({
      type: DELETE_STOCK,
      payload: id
    });
  } catch (err) {
    stockError(err, abortController);
  }
};

//Update CURRENT_STOCK
export const updateCurrentStock = stock => async dispatch => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = {
      "Content-Type": "application/json",
    signal
  };
  try {
    setLoading();
    const res = await axios.put(`api/stocks/${stock["stock"]._id}`, stock, config);
    dispatch({
      type: UPDATE_CURRENT_STOCK,
      payload: res.data
    });
  } catch (err) {
    stockError(err, abortController);
  }
};

//Set CURRENT_STOCK
export const setCurrentStock = stock => dispatch => {
  dispatch({
    type: SET_CURRENT_STOCK,
    payload: stock
  });
};

//Clear CURRENT_STOCK
export const clearCurrentStock = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_STOCK
  });
};

//Filter Stocks
export const filterStocks = text => dispatch => {
  dispatch({
    type: FILTER_STOCKS,
    payload: text
  });
};

//Clear Filter
export const clearFilter = () => dispatch => {
  dispatch({
    type: CLEAR_FILTER
  });
};

// Set Loading
export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING
  });
};

// Clear Stocks
export const clearStocks = () => dispatch => {
  dispatch({
    type: CLEAR_STOCKS
  });
};

//Stock Error
export const stockError = (err, abortController) => dispatch => {
  dispatch({
    type: STOCK_ERROR,
    payload: err.message
  });
  abortController.abort();
};