import React, { useState, useContext, useEffect } from 'react'
import StockContext from '../../context/stocks/stockContext'

const StockForm = () => {
    const stockContext = useContext(StockContext)
    const { addStock,updateCurrentStock, clearCurrentStock,  current } = stockContext
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
    },[stockContext,current])

    const onChange = e => setStock({...stock,
            [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if(current) {
            updateCurrentStock(current)
            clearCurrentStock()
        } else {
            addStock(stock)
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
                <h2 className='form-title'>{CURRENT_STOCK ? 'Update Stock' : 'Add Stock'}</h2>
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

export default StockForm