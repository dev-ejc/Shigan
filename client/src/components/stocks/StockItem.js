import React, { useContext, useEffect } from 'react'
import StockContext from '../../context/stocks/stockContext'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPrice } from '../../state/prices/pricesActions'

const StockItem = ({ prices: {prices, loading}, stock }) => {
    const stockContext = useContext(StockContext)
    const { deleteStock, setCurrentStock, clearCurrentStock } = stockContext
    const { _id, ticker } = stock

    useEffect(() => {
        getPrice(ticker)
    }, 
    [ticker])

    const onDelete = () => {
        deleteStock(_id)
        clearCurrentStock()
    }
    
    // const price = prices[ticker]
    // console.log(price)
    return (
        <div className="card bg-secondary mt-1">
            <div className="card-body">
            <h3 className="card-title text-dark text-left">
                {ticker}
            </h3>
            <table className="table table-bordered">
                <tbody>
                    {Object.keys(stock).map(key => {
                    return (<tr key={key}>
                        <td className="text-right">{key}</td>
                        <td>{stock[key]}</td>
                    </tr>)})}
                    {Object.keys(stock).map(key => {
                    return (<tr key={key}>
                        <td className="text-right">{key}</td>
                        <td>{stock[key]}</td>
                    </tr>)})}
                </tbody>
            </table>
                <div className="container text-center mx-auto">
                    <button onClick={() => setCurrentStock(stock)} className="btn btn-dark  btn-block">Edit</button>
                    <button onClick={onDelete} className="btn btn-danger btn-block">Delete</button>
                </div>
            </div>
        </div>
    )       
}

StockItem.propTypes = {
    stock : PropTypes.object.isRequired,
    prices: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    prices:state.prices
});

export default connect(mapStateToProps, {getPrice})(StockItem)