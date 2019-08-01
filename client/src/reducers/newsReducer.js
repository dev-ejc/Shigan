import { GET_NEWS, SET_LOADING, NEWS_ERROR, SET_KEYWORD, SET_CURRENT_NEW } from '../types'

const initialState = {
    news:null,
    keyword:'',
    loading:false,
    current:'',
    error:null
}

export default (state = initialState,action) => {
    switch(action.type) {
        case SET_KEYWORD:
            return {
                ...state,
                keyword:action.payload,
            }
        case GET_NEWS:
            return {
                ...state,
                news:  action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case NEWS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}