import { SEARCH_KEYWORD, SET_LOADING, CLEAR_SEARCH } from '../type'

export default (state,action) => {
    switch(action.type) {
        case SEARCH_KEYWORD:
            return {...state,
                    stocks: action.payload,
                    loading:false}
        case CLEAR_SEARCH:
            return {...state,
                stocks: [],
            loading:false}
        case SET_LOADING:
            return {...state,loading: true}
        default:
            return state
    }
}