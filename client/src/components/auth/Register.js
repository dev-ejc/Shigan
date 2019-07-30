import React, { useContext, useState, useEffect } from 'react'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const { register, error , clearErrors, isAuthenticated} = authContext
    const { setAlert } = alertContext
    const { name,email,password,password2 } = user

    const onChange = e => {
        setUser({...user,[e.target.name]:e.target.value })
    }

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

    const onSubmit = (e) => {
        e.preventDefault()
        if(name === '' || email === '' || password === '') {
            console.log(user)
            setAlert('Please enter all fields', 'danger')
        } else if ( password !== password2 ) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({
                name,
                email,
                password
            })
        }
    }

    return (
        <div className="form-container mt-2">
            <form className="form p-2"onSubmit={onSubmit}>
                <h1>
                    Account <span className="text-primary">Register</span>
                </h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input className="form-control" type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={onChange} required minLength='7'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">password2</label>
                    <input className="form-control" type="password" name="password2" value={password2} onChange={onChange} required />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Register
