import { combineReducers } from 'redux'
import newsReducer from './news/newsReducer'
import pricesReducer from './prices/pricesReducer'
import portfolioReducer from './portfolios/portfolioReducer';
import authReducer from './auth/authReducer';
import alertsReducer from './alerts/alertsReducer';
import stocksReducer from './stocks/stocksReducer';

export default combineReducers({
    news: newsReducer,
    prices: pricesReducer,
    portfolios: portfolioReducer,
    auths: authReducer,
    alerts: alertsReducer,
    stocks: stocksReducer
}) 