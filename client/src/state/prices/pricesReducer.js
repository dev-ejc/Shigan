import { GET_PRICES, ADD_PRICE, SET_LOADING, PRICE_ERROR, DELETE_PRICE } from "./types";

const initialState = {
  prices: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRICES:
      return {
        ...state,
        prices: action.payload,
        loading: false
      };
    case ADD_PRICE:
      return {
        ...state,
        prices: [...state.prices,  action.payload],
        loading: false
      };
    case DELETE_PRICE:
      return {
        ...state,
        prices: state.prices.splice(action.payload,1),
        loading: false
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case PRICE_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
