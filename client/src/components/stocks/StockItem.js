import React, { useContext, useEffect } from 'react'
import StockContext from '../../context/stocks/stockContext'

const StockItem = ({ price, stock }) => {
    const stockContext = useContext(StockContext)
    const { deleteStock, setCurrentStock, clearCurrentStock } = stockContext
    const { _id, ticker } = stock

    const onDelete = () => {
        deleteStock(_id)
        clearCurrentStock()
    }

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

export default StockItem