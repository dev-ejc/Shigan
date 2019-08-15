import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../state/auth/authAction'
import { clearStocks } from '../../state/stocks/stocksAction'

const Navbar = ({auths:{isAuthenticated},logout,clearStocks, title,icon }) => {
    const onLogout = () => {
        logout()
        clearStocks()
    }

    const authLinks = (
        <Fragment>
            <li className="nav-item mx-auto"><Link className="nav-link" to='/'>Home</Link></li>
            <li className="nav-item mx-auto"><Link className="nav-link" to='/About'>About</Link></li>
            <li className="nav-item mx-auto">
                <a className="nav-link" href="/"  onClick={onLogout}>
                    <i className="fas fa-signout-alt"></i>{' '}Logout
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li className="nav-item mx-auto"><Link className="nav-link" to='/Register'>Register</Link></li>
            <li className="nav-item mx-auto"><Link className="nav-link" to='/Login'>Login</Link></li>
        </Fragment>
    )
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a href="/" className="navbar-brand mx-auto">{title}</a>
            <button className="navbar-toggler btn-block" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                {isAuthenticated ? authLinks : guestLinks}           
            </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    auths: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auths: state.auths
})

Navbar.defaultProps = {
    title: 'Shigan'
}


export default connect(mapStateToProps,{logout,clearStocks})(Navbar)
