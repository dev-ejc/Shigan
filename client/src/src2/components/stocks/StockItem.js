import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
const StockItem = ({data}) => {
    return (
        <div className="card" style={cardStyle}>
            <div className="card-body">
            <h5 className="card-title">{data["1. symbol"]}</h5>
            <table className="table">
            <tbody>
                {Object.keys(data).map(key => (<tr key={key}><td>{key.split('.')[1]}</td><td>{data[key]}</td></tr>))}
            </tbody>
            </table>
            <Link to={`/stock/${data["1. symbol"]}`} className="btn btn-primary">Info</Link>
            </div>
        </div>            
    )
}

StockItem.propTypes = {
    data: PropTypes.object.isRequired
}

const cardStyle = {
    display: "inline-block",
    columnBreakInside: "avoid"
}

export default StockItem
