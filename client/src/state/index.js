import { combineReducers } from 'redux'
import newsReducer from './news/newsReducer'
import pricesReducer from './prices/pricesReducer'
import portfolioReducer from './portfolios/portfolioReducer';

export default combineReducers({
    news: newsReducer,
    prices: pricesReducer,
    portfolios: portfolioReducer
}) 