import  { ADD_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIOS, CLEAR_PORTFOLIOS, SET_CURRENT_PORTFOLIO, CLEAR_CURRENT_PORTFOLIO, UPDATE_CURRENT_PORTFOLIO, FILTER_PORTFOLIOS, CLEAR_FILTER, SET_LOADING, PORTFOLIO_ERROR } from './types'
import axios from 'axios'

// @todo abstract api requests
export const getPortfolios = () => async dispatch => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const config = { signal };
    try {
      setLoading();
      const res = await axios.get("/api/portfolios", config);
      dispatch({
        type: GET_PORTFOLIOS,
        payload: res.data
      });
      abortController.abort();
    } catch (err) {
      controlError(err, abortController);
    }
  };

  // Add Portfolio
export const addPortfolio = portfolio => async dispatch => {
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
      const res = await axios.post("/api/portfolios", portfolio, config);
      dispatch({
        type: ADD_PORTFOLIO,
        payload: res.data
      });
    } catch (err) {
      controlError(err, abortController);
    }
  };

export const deletePortfolio =  id => async dispatch => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const config = { signal };
    try {
      setLoading();
      await axios.delete(`api/portfolios/${id}`, config);
      dispatch({
        type: DELETE_PORTFOLIO,
        payload: id
      });
    } catch (err) {
      controlError(err, abortController);
    }
  };

  //Update CURRENT_PORTFOLIO
export const updateCurrentPortfolio =  portfolio => async dispatch => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const config = {
      "Content-Type": "application/json",
      signal
    };
    try {
      setLoading();
      const res = await axios.put(
        `api/portfolios/${portfolio._id}`,
        portfolio,
        config
      );
      dispatch({
        typp: UPDATE_CURRENT_PORTFOLIO,
        payload: res.data
      });
    } catch (err) {
      controlError(err, abortController);
    }
  };

export const setCurrentPortfolio = portfolio => async dispatch => {
    dispatch({
      type: SET_CURRENT_PORTFOLIO,
      payload: portfolio
    });
  };

  // CURRENT_PORTFOLIO
export const clearCurrentPortfolio = () => async dispatch => {
    dispatch({
      type: CLEAR_CURRENT_PORTFOLIO
    });
  };

export const filterPortfolios = (text) => async dispatch =>{
    dispatch({
      type: FILTER_PORTFOLIOS,
      payload: text
    });
  };

export const clearFilter = () => async dispatch => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  // Set Loading
export const setLoading = () => async dispatch => {
    dispatch({
      type: SET_LOADING
    });
  };

  // Clear Portfolios
export const clearPortfolios = () => async dispatch => {
    dispatch({
      type: CLEAR_PORTFOLIOS
    });
  };

  //Portfolio Error
export const controlError = (err, abortController) => async dispatch =>{
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: err.message
    });
    abortController.abort();
  };
