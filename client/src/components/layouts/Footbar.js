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
        <nav className="navbar navbar-expand-lg navbar-ligh bg-transparent">
            <ul className="navbar-nav mx-auto">
                {isAuthenticated ? authLinks : guestLinks}           
            </ul>
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
    title: 'Porting',
    icon: 'fas fa-anchor'
}


export default connect(mapStateToProps,{logout,clearStocks})(Navbar)
