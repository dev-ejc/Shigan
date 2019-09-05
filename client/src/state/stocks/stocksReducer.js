import  { SEARCH_KEYWORD, CLEAR_SEARCH, GET_HISTORICAL, SET_UPDATE, SET_INFO, ADD_STOCK, DELETE_STOCK, GET_STOCKS, CLEAR_STOCKS, SET_CURRENT_STOCK, CLEAR_CURRENT_STOCK, UPDATE_CURRENT_STOCK, FILTER_STOCKS, CLEAR_FILTER, SET_LOADING, STOCK_ERROR } from './types'

const initialState = {
    update: false,
    stocks: null,
    current: null,
    results: [],
    filtered: null,
    error: null,
    historical:[],
    loading: false
  };

export default (state = initialState,action) => {
    switch (action.type) {
        case SET_INFO:
            return {
                ...state,
                update: false
            }
        case SEARCH_KEYWORD:
            return {
                ...state,
                results: action.payload,
                loading:false
            }
        case CLEAR_SEARCH:
                return {
                    ...state,
                    results: []
                }
        case SET_UPDATE:
            return {
                ...state,
                update: true
            }
        case GET_HISTORICAL:
            return {
                ...state,
                historical: action.payload,
                loading:false
            }
        case GET_STOCKS:
            return {
                ...state,
                stocks: action.payload,
                loading:false
            }
        case ADD_STOCK:
            return {
                ...state,
                stocks: [...state.stocks,action.payload],
                loading:false
            }
        case DELETE_STOCK:
            return {
                ...state,
                stocks: state.stocks.filter(stock => stock["stock"]._id !== action.payload),
                loading:false
            }

        case STOCK_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case SET_CURRENT_STOCK: {
            return {
                ...state,
                current:action.payload,
                loading:false
            }
        }
        
        case UPDATE_CURRENT_STOCK: {
            return {
                ...state,
                stocks: state.stocks.map(stock => stock["stock"]._id === action.payload["stock"]._id ? action.payload : stock),
                loading:false
            }
        }

        case CLEAR_STOCKS: {
            return {
                ...state,
                stocks:null,
                filtered:null,
                error:null,
                current:null,
                loading:false
            }
        }

        case CLEAR_CURRENT_STOCK: {
            return {
                ...state,
                current:null,
                loading:false
            }
        }

        case FILTER_STOCKS: {
            return {
                ...state,
                filtered:state.stocks.filter(stock => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return stock["stock"].ticker.match(regex)                
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