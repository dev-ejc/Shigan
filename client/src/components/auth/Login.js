import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alerts/alertContext'

const Login = (props) => {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)

    const { setAlert } = alertContext
    const { error, isAuthenticated,login, clearErrors} = authContext

    const [user,setUser] = useState({
        email:'',
        password:''
    })

    const { email,password } = user

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        if(error) {
            setAlert(error, 'danger')
            clearErrors()
        }
    },// eslint-disable-next-line
    [error, isAuthenticated, props.history])
    const onChange = e => {
        setUser({...user,[e.target.name]:e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if( email === '' || password === '') {
            setAlert('Please fill in all fields')
        } else {
            console.log('Submit Initialized')
            login({email,password})
        }
    }

    return (
        <div className="form-container mt-2">
            <form className="form p-2" onSubmit={onSubmit}>
            <h1 className="form-title">
                Account <span className="text-primary">Login</span>
            </h1>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input className="form-control" type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login
