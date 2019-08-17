import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ auths:{ isAuthenticated },component: Component, ...rest }) => {  
    if(isAuthenticated) {
        return (
            <Route { ...rest } render={props => <Component { ...props }/>} />
        )    
    }
    return (
        <Redirect to='/Login'/>
    )
}

PrivateRoute.propTypes = {
    auths: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auths:state.auths
})

export default connect(mapStateToProps,{})(PrivateRoute)
