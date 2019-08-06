import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types'
import setAuthToken from "../../utils/setAuthToken";
import axios from 'axios'

// Load User
export const loadUser = () => async dispatch => {
    console.log('loading user')
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
// TODO find a way to utilize https connections instead of http
export const register = formData => async dispatch => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    signal
  };
  try {
    const res = await axios.post("/api/users", formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    await loadUser();
    abortController.abort();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.message
    });
    abortController.abort();
  }
};
// Login User
export const login = formData => async dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    console.log("Logging in");
    const res = await axios.post("/api/auth", formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    await loadUser();
    console.log("Logged in redirecting");
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.message
    });
  }
};

// Logout
export const logout = () => dispatch =>
  dispatch({
    type: LOGOUT
  });
  
// Clear Errors
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};
