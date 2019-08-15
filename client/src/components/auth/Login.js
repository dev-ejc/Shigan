import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../state/alerts/alertsAction'
import { login, clearErrors } from '../../state/auth/authAction'
import PropTypes from 'prop-types'

const Login = ({history, setAlert,login,clearErrors, auths:{error,isAuthenticated}}) => {

    const [user,setUser] = useState({
        email:'',
        password:''
    })

    const { email,password } = user

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
        if(error) {
            setAlert(error, 'danger')
            clearErrors()
        }
    },// eslint-disable-next-line
    [])
    const onChange = e => {
        setUser({...user,[e.target.name]:e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if( email === '' || password === '') {
            setAlert('Please fill in all fields')
        } else {
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

Login.propTypes = {
    auths: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    auths: state.auths
})

export default connect(mapStateToProps, {setAlert,login,clearErrors})(Login)
