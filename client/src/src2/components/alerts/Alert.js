import React, { useContext } from 'react'
import AlertContext from '../../context/alerts/alertContext'

const Alert = props => {
    const alertContext = useContext(AlertContext)
    const { alert } = alertContext
    return (alert !== null && (
        <div className="alert alert-danger mt-2" role="alert">
            {alert.msg}
        </div>
      )
    ); 
};

export default Alert