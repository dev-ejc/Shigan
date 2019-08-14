import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PortfolioInfo = ({portfolio}) => {
    const { name, openDate } = portfolio;
    return (
    <Fragment>
    <h3 className="card-title text-dark text-center">{name}</h3>
    <table className="table table-bordered">
        <tbody>
          <tr>
            <td className="text-right">Open Date</td>
            <td>{openDate.split("T")[0]}</td>
          </tr>
        </tbody>
      </table>
      </Fragment>
    )
}

PortfolioInfo.propTypes = {
    portfolio: PropTypes.object.isRequired
}

export default PortfolioInfo
