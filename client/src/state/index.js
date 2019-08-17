import { combineReducers } from 'redux'
import authReducer from './auth/authReducer';
import alertsReducer from './alerts/alertsReducer';
import stocksReducer from './stocks/stocksReducer';

export default combineReducers({
    auths: authReducer,
    alerts: alertsReducer,
    stocks: stocksReducer
}) 