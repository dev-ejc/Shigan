import React, { useContext } from 'react'
import StockContext from '../../context/stocks/stockContext'
import PropTypes from 'prop-types'

const StockItem = ({ stock }) => {
    const stockContext = useContext(StockContext)
    const { deleteStock, setCURRENT_STOCK, clearCURRENT_STOCK } = stockContext
    const { _id, ticker } = stock

    const onDelete = () => {
        deleteStock(_id)
        clearCURRENT_STOCK()
    }

    return (
        <div className="card bg-secondary mt-1">
            <div className="card-body">
            <h3 className="card-title text-dark text-left">
                {ticker}
            </h3>
            <table className="table table-bordered">
                <tbody>
                    <tr key="ticker">
                        <td className="text-right">TICKER</td>
                        <td>{stock.ticker}</td>
                    </tr>
                    <tr key='shares'>
                        <td className="text-right">SHARES</td>
                    <td>{stock.shares}</td>
                </tr>
                </tbody>
            </table>
                <div className="container text-center mx-auto">
                    <button onClick={() => setCURRENT_STOCK(stock)} className="btn btn-dark  btn-block">Edit</button>
                    <button onClick={onDelete} className="btn btn-danger btn-block">Delete</button>
                </div>
            </div>
        </div>
    )       
}

StockItem.propTypes = {
    stock : PropTypes.object.isRequired
}

export default StockItem