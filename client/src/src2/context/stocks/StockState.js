import React, { useReducer } from 'react'
import StockContext from './stockContext'
import StockReducer from './stockReducer';
import { SET_LOADING, SEARCH_KEYWORD, CLEAR_SEARCH } from '../type'
import axios from 'axios'

const StockState = props => {

    const initialState =  {
        keyword: '',
        stocks: [],
        loading: false
    }

    const callAvantageSearch = async (keyWord,signal) => {
        const res = await axios(
                "https://www.alphavantage.co/query", 
                 { signal:signal,
                    params: {
                "function":"SYMBOL_SEARCH",
                "keywords":keyWord,
                "apikey":process.env.REACT_APP_ALPHAVANTAGE_KEY
            }})
            return res.data    
    }

    const [state,dispatch] = useReducer(StockReducer, initialState)

    const searchKeyword = async (keyWord) => {
        setLoading();
        const data = await callAvantageSearch(keyWord)
        dispatch({type:SEARCH_KEYWORD, 
                    payload:data.bestMatches})
    }

    const setLoading = () => {
        dispatch({type:SET_LOADING})
    }

    const clearSearch = () => {
        dispatch({type: CLEAR_SEARCH})
    }

    return (
            <StockContext.Provider value={{
                keyword: state.keyword,
                stocks: state.stocks,
                loading: state.loading,
                searchKeyword, 
                clearSearch
            }}>
                {props.children}
            </StockContext.Provider>
    )
}

export default StockState
