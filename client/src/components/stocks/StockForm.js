import React, { useState, useEffect } from 'react'
import { addPrice } from '../../state/prices/pricesActions';
import { addStock,updateCurrentStock,clearCurrentStock } from '../../state/stocks/stocksAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const StockForm = ({portfolios,stocks:{current}, addPrice, addStock,updateCurrentStock,clearCurrentStock}) => {

    const [stock, setStock] =  useState({
        ticker:'',
        shares:0,
        date: Date.now()
    })

    useEffect(() => {
        if(current !== null) {
            setStock(current)
        } else {
            setStock(
                {
                    ticker:'',
                    shares:0,
                    stockName:'',
                    date: Date.now()
                }
            )
        }
    },[current])

    const onChange = e => setStock({...stock,
            [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if(current) {
            console.log(current)
            console.log(stock)
            updateCurrentStock(stock)
            clearCurrentStock()
        } else {
            addStock(stock, portfolios.current._id)
            //addPrice(stock.ticker)
            setStock(
                {
                    ticker:'',
                    shares:0,
                    date: Date.now()
                }
            )
        }
    }

    const clearAll = () => {
        clearCurrentStock()
    }

    const { ticker, shares } = stock

    return (
            <div className="container border mt-1">
            <form className="form p-2" onSubmit={onSubmit}>
                <h2 className='form-title'>{current ? 'Update Stock' : 'Add Stock'}</h2>
                <div className="form-group">
                    <label htmlFor="ticker">Ticker</label>                
                    <input className="form-control" 
                        type="text"
                        name="ticker"
                        placeholder="Ticker"
                        value={ticker}
                        onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="shares">Shares</label>
                    <input className="form-control" 
                        type="integer"
                        name="shares" 
                        placeholder={0}
                        value={shares}
                        onChange={onChange}/>
                </div>
                    <button type="submit" className="btn btn-primary btn-block">{current ? 'Update Stock' : 'Add Stock'}</button>
                    {current && <button onClick={clearAll} type="submit" className="btn btn-secondary btn-block">Clear All</button>}
            </form>
            </div>
    )
}

StockForm.prototype = {
    prices: PropTypes.object.isRequired,
    stocks: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    prices:state.prices,
    stocks: state.stocks,
    portfolios: state.portfolios
});

export default connect(mapStateToProps,{addPrice,addStock,updateCurrentStock,clearCurrentStock})(StockForm)