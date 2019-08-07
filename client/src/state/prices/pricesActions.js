import {
  GET_PRICES,
  GET_HISTORICAL_PRICES,
  SET_LOADING,
  PRICE_ERROR,
  ADD_PRICE,
  DELETE_PRICE
} from "./types";
import axios from "axios";

//@TODO possible breakpoint
export const getPrices = id => dispatch => {
  setLoading();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    signal
  };
  axios
    .get(`api/prices/${id}`, config)
    .then(res => {
      dispatch({
        type: GET_PRICES,
        payload: res.data
      });
      abortController.abort();
    })
    .catch(err => {
      dispatch({
        type: PRICE_ERROR,
        payload: err
      });
      abortController.abort();
    });
};

//@TODO possible breakpoint
export const getHistoricalPrices = id => dispatch => {
  setLoading();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    signal
  };
  axios
    .get(`api/prices/historical/${id}`, config)
    .then(res => {
      dispatch({
        type: GET_HISTORICAL_PRICES,
        payload: res.data
      });
      abortController.abort();
    })
    .catch(err => {
      dispatch({
        type: PRICE_ERROR,
        payload: err
      });
      abortController.abort();
    });
};

//@TODO possible breakpoint
export const addPrice = ticker => dispatch => {
  setLoading();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    signal
  };
  axios
    .get(`api/prices/ticker/${ticker}`, config)
    .then(res => {
      dispatch({
        type: ADD_PRICE,
        payload: res.data
      });
      abortController.abort();
    })
    .catch(err => {
      dispatch({
        type: PRICE_ERROR,
        payload: err
      });
      abortController.abort();
    });
};

export const deletePrice = index => dispatch => {
  try {
    dispatch({
      type: DELETE_PRICE,
      payload: index
    });
  } catch (err) {
    dispatch({
      type: PRICE_ERROR,
      payload: err
    });
  }
};
// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
