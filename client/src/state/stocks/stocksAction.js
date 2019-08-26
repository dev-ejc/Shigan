import {
  SET_INFO,
  SET_UPDATE,
  ADD_STOCK,
  DELETE_STOCK,
  GET_STOCKS,
  CLEAR_STOCKS,
  SET_CURRENT_STOCK,
  CLEAR_CURRENT_STOCK,
  UPDATE_CURRENT_STOCK,
  FILTER_STOCKS,
  CLEAR_FILTER,
  SET_LOADING,
  STOCK_ERROR,
  GET_HISTORICAL
} from "./types";
import axios from "axios";

// @todo abstract api requests
export const getStocks = () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get("/api/stocks");
    dispatch({
      type: GET_STOCKS,
      payload: res.data
    });
  } catch (err) {
    stockError(err);
  }
};

// @todo abstract api requests
export const getHistorical= () => async dispatch => {
  try {
    setLoading();
    const res = await axios.get("/api/stocks/historical-price");
    dispatch({
      type: GET_HISTORICAL,
      payload: res.data
    });
  } catch (err) {
    stockError(err);
  }
};

// Add Stock
export const addStock = (stock) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    setLoading();
    const res = await axios.post("/api/stocks", stock, config);
    dispatch({
      type: ADD_STOCK,
      payload: res.data
    });
  } catch (err) {
    stockError(err);
  }
};

// Delete Stock
export const deleteStock = id => async dispatch => {
  const config = { params: {
    id} };
  try {
    setLoading();
    await axios.delete(`api/stocks/${id}`, config);
    dispatch({
      type: DELETE_STOCK,
      payload: id
    });
  } catch (err) {
    stockError(err);
  }
};

//Update CURRENT_STOCK
export const updateCurrentStock = stock => async dispatch => {
  try {
    setLoading();
    const res = await axios.put(`api/stocks/${stock._id}`, stock);
    dispatch({
      type: UPDATE_CURRENT_STOCK,
      payload: res.data
    });
  } catch (err) {
    stockError(err);
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

// Set Loading
export const setInfo = () => dispatch => {
  dispatch({
    type: SET_INFO
  });
};
// Set Loading
export const setUpdate= () => dispatch => {
  dispatch({
    type: SET_UPDATE
  });
};

// Clear Stocks
export const clearStocks = () => dispatch => {
  dispatch({
    type: CLEAR_STOCKS
  });
};

//Stock Error
export const stockError = (err) => dispatch => {
  dispatch({
    type: STOCK_ERROR,
    payload: err.message
  });
};
