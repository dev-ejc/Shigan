import React, { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import { SET_ALERT,CLEAR_ALERT } from '../type'

const AlertState = props => {
    const initialState = {
        alert:null
    }

    const [state,dispatch] = useReducer(AlertReducer,initialState)

    const clearAlert = () => {
        dispatch({type:CLEAR_ALERT})
    }

    const setAlert = (type,msg) => {
        console.log(type)
        console.log(msg)
        dispatch({type:SET_ALERT,payload:{type,msg}})
        setTimeout(() => {clearAlert()},5000)
    }

    return (
            <AlertContext.Provider
            value={
                {alert:state.alert,
                setAlert,
                clearAlert}}>
                {props.children}
            </AlertContext.Provider>       
    )
}

export default AlertState