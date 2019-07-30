import React, { useReducer } from "react";
import axios from "axios";
import PortfolioContext from "./portfolioContext";
import portfolioReducer from "./portfolioReducer";
import {
  ADD_PORTFOLIO,
  DELETE_PORTFOLIO,
  GET_PORTFOLIOS,
  CLEAR_PORTFOLIOS,
  SET_CURRENT_PORTFOLIO,
  UPDATE_CURRENT_PORTFOLIO,
  CLEAR_CURRENT_PORTFOLIO,
  SET_LOADING,
  FILTER_PORTFOLIOS,
  CLEAR_FILTER,
  PORTFOLIO_ERROR
} from "../types.js";

const PortfolioState = props => {
  const initialState = {
    portfolios: null,
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // @todo abstract api requests
  const getPortfolios = async () => {
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
  const addPortfolio = async portfolio => {
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

  const deletePortfolio = async id => {
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
  const updateCurrentPortfolio = async Portfolio => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const config = {
      "Content-Type": "application/json",
      signal
    };
    try {
      setLoading();
      const res = await axios.put(
        `api/portfolios/${Portfolio._id}`,
        Portfolio,
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

  const setCurrentPortfolio = portfolio => {
    dispatch({
      type: SET_CURRENT_PORTFOLIO,
      payload: portfolio
    });
  };

  // CURRENT_PORTFOLIO
  const clearCurrentPortfolio = () => {
    dispatch({
      type: CLEAR_CURRENT_PORTFOLIO
    });
  };
  const filterPortfolios = (text) => {
    dispatch({
      type: FILTER_PORTFOLIOS,
      payload: text
    });
  };

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

  // Clear Portfolios
  const clearPortfolios = () => {
    dispatch({
      type: CLEAR_PORTFOLIOS
    });
  };

  //Portfolio Error
  const controlError = (err, abortController) => {
    dispatch({
      type: PORTFOLIO_ERROR,
      payload: err.message
    });
    abortController.abort();
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolios: state.portfolios,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addPortfolio,
        deletePortfolio,
        updateCurrentPortfolio,
        clearCurrentPortfolio,
        getPortfolios,
        clearPortfolios,
        setCurrentPortfolio,
        filterPortfolios,
        clearFilter
      }}
    >
      {props.childpen}
    </PortfolioContext.Provider>
  );
};

export default PortfolioState;
