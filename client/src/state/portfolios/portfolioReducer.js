import  { ADD_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIOS, CLEAR_PORTFOLIOS, SET_CURRENT_PORTFOLIO, CLEAR_CURRENT_PORTFOLIO, UPDATE_CURRENT_PORTFOLIO, FILTER_PORTFOLIOS, CLEAR_FILTER, SET_LOADING, PORTFOLIO_ERROR } from './types'

const initialState = {
    portfolios: null,
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

export default (state = initialState,action) => {
    switch (action.type) {
        case GET_PORTFOLIOS:
            return {
                ...state,
                portfolios: action.payload,
                loading:false
            }

        case ADD_PORTFOLIO:
            return {
                ...state,
                portfolios: [...state.portfolios,action.payload],
                loading:false
            }

        case DELETE_PORTFOLIO:
            return {
                ...state,
                portfolios: state.portfolios.filter(portfolio => portfolio._id !== action.payload),
                loading:false
            }

        case PORTFOLIO_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case SET_CURRENT_PORTFOLIO: {
            return {
                ...state,
                current:action.payload,
                loading:false
            }
        }

        case UPDATE_CURRENT_PORTFOLIO: {
            return {
                ...state,
                portfolios: state.portfolios.map(portfolio => portfolio._id === action.payload._id ? action.payload : portfolio),
                loading:false
            }
        }

        case CLEAR_PORTFOLIOS: {
            return {
                ...state,
                portfolios:null,
                filtered:null,
                error:null,
                current:null,
                loading:false
            }
        }

        case CLEAR_CURRENT_PORTFOLIO: {
            return {
                ...state,
                current:null,
                loading:false
            }
        }

        case FILTER_PORTFOLIOS: {
            return {
                ...state,
                filtered:state.portfolios.filter(portfolio => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return portfolio.name.match(regex)                
                }),
                loading:false
            }
        }

        case CLEAR_FILTER: {
            return {
                ...state,
                filtered: null,
                loading:false
            }
        }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }    
}