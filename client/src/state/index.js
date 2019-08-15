import { combineReducers } from 'redux'
import portfolioReducer from './portfolios/portfolioReducer';
import authReducer from './auth/authReducer';
import alertsReducer from './alerts/alertsReducer';
import stocksReducer from './stocks/stocksReducer';

export default combineReducers({
    portfolios: portfolioReducer,
    auths: authReducer,
    alerts: alertsReducer,
    stocks: stocksReducer
}) 