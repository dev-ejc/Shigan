import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import StockContext from '../../context/stocks/stockContext'

const Navbar = ({ title,icon }) => {
    const authContext = useContext(AuthContext)
    const stockContext = useContext(StockContext)

    const { isAuthenticated, logout } = authContext
    const { clearStocks } = stockContext
    const onLogout = () => {
        logout()
        clearStocks()
    }

    const authLinks = (
        <Fragment>
            <li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/About'>About</Link></li>
            <li className="nav-item">
                <a className="nav-link" href="/"  onClick={onLogout}>
                    <i className="fas fa-signout-alt"></i>{' '}Logout
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li className="nav-item"><Link className="nav-link" to='/Register'>Register</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/Login'>Login</Link></li>
        </Fragment>
    )
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a href="/" className="navbar-brand"><i className={icon} />{' '}{title}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Porting',
    icon: 'fas fa-anchor'
}

export default Navbar
