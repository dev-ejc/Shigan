import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";

const AuthState = props => {
  const initialState = {
    token: sessionStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  //eslint-disable-next-line
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
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
  const register = async formData => {
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
  const login = async formData => {

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
  const logout = () =>
    dispatch({
      type: LOGOUT
    });
  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        user: state.user,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        register,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
