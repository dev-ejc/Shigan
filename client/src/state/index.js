import { combineReducers } from 'redux'
import newsReducer from './news/newsReducer'
import pricesReducer from './prices/pricesReducer'

export default combineReducers({
    news: newsReducer,
    prices: pricesReducer
}) 