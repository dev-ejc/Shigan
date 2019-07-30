import React, { useContext, useRef, useEffect } from 'react'
import StockContext from '../../context/stocks/stockContext'

const StockFilter = () => {
    const stockContext = useContext(StockContext)
    const { filterStocks, clearFilter, filtered} = stockContext
    const text = useRef('')

    useEffect(() => {
        if(filtered === null) {
            text.current.value = ''
        }
    })

    const onChange = e => {
        if(text.current.value !== '') {
            filterStocks(e.target.value)
        } else {
            clearFilter()
        }
    }
    
    return (
        <form>
            <div className="form-group">
                <input className="form-control" ref={text} type="text" onChange={onChange}/>
            </div>
        </form>
    )
}

export default StockFilter
