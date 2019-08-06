import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../state/alerts/alertsAction'
import { register, clearErrors } from '../../state/auth/authAction'
import PropTypes from 'prop-types'

const Register = ({history, auths: {error, isAuthenticated}, register,clearErrors, setAlert}) => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const { name,email,password,password2 } = user
    const onChange = e => {
        setUser({...user,[e.target.name]:e.target.value })
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
        if(error) {
            setAlert(error, 'danger')
            clearErrors()
        }
    },// eslint-disable-next-line
    [error, isAuthenticated, history])

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

Register.propTypes = {
    auths: PropTypes.object.isRequired,
}

mapStateToProps = {
    auths: state.auths
}

export default connect(mapStateToProps, {setAlert,register,clearErrors})(Register)
