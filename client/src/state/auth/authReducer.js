import { AUTHENTICATE, REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types'

const initialState = {
    isAuthenticated: false,
    loading: true,
    error: null
  };

export default (state = initialState, action) => {
    switch(action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            sessionStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            sessionStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
                sessionStorage.removeItem('token')
                return {
                    ...state,
                    error: null
                }
        default:
            return state
    }
}