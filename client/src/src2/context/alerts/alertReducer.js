import {SET_ALERT,CLEAR_ALERT} from '../type'

export default (state,action) => {
    switch(action.type) {
        case SET_ALERT:
            return {...state,
                      alert: {type:action.payload.type,
                        msg:action.payload.msg}  }
        case CLEAR_ALERT:
            return {...state, alert: null }
        default:
            return state
    }
}