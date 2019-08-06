import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const Alert = ({alerts}) => {

    return (
            alerts.length > 0 && alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.type} mt-3`}>
                    <i className="fas fa-info-circle" />{' '}{alert.msg}
                </div>
            )
        )
    )
}

Alert.prototypes ={
    alerts: PropTypes.object.isRequired,
}

mapStateToProps = {
    alerts: state.alerts
}

export default connect(mapStateToProps,{})(Alert)
