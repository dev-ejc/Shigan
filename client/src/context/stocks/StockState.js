import React, { useReducer } from "react";
import axios from "axios";
import StockContext from "./stockContext";
import stockReducer from "./stockReducer";
import {
  ADD_STOCK,
  DELETE_STOCK,
  GET_STOCKS,
  CLEAR_STOCKS,
  SET_CURRENT_STOCK,
  UPDATE_CURRENT_STOCK,
  CLEAR_CURRENT_STOCK,
  SET_LOADING,
  FILTER_STOCKS,
  CLEAR_FILTER,
  STOCK_ERROR
} from "../types.js";

const StockState = props => {
  const initialState = {
    stocks: null,
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(stockReducer, initialState);

  // @todo abstract api requests
  const getStocks = async id => {
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
  const addStock = async stock => {
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
  const deleteStock = async id => {
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
  const updateCurrentStock = async stock => {
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
      const res = await axios.put(`api/stocks/${stock._id}`, stock, config);
      dispatch({
        type: UPDATE_CURRENT_STOCK,
        payload: res.data
      });
    } catch (err) {
      stockError(err, abortController);
    }
  };

  //Set CURRENT_STOCK
  const setCurrentStock = stock => {
    dispatch({
      type: SET_CURRENT_STOCK,
      payload: stock
    });
  };

  //Clear CURRENT_STOCK
  const clearCurrentStock = () => {
    dispatch({
      type: CLEAR_CURRENT_STOCK
    });
  };

  //Filter Stocks
  const filterStocks = text => {
    dispatch({
      type: FILTER_STOCKS,
      payload: text
    });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  // Set Loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  // Clear Stocks
  const clearStocks = () => {
    dispatch({
      type: CLEAR_STOCKS
    });
  };

  //Stock Error
  const stockError = (err, abortController) => {
    dispatch({
      type: STOCK_ERROR,
      payload: err.message
    });
    abortController.abort();
  };

  return (
    <StockContext.Provider
      value={{
        stocks: state.stocks,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addStock,
        deleteStock,
        getStocks,
        updateCurrentStock,
        clearStocks,
        setCurrentStock,
        clearCurrentStock,
        filterStocks,
        clearFilter
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
