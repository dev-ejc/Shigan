import {SET_ALERT, REMOVE_ALERT} from './types'

// Set Alert
export const setAlert = (msg,type) => dispatch => {
        const id = state.length + 1
        dispatch({
            type: SET_ALERT,
            payload: {
                msg,type,id
            }
        })
        setTimeout(() => {
            dispatch({type: REMOVE_ALERT,payload:id})
        }, 5000)
    }