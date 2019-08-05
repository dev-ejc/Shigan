import React, { useRef, useEffect } from 'react'
import { filterStocks, clearFilter } from '../../state/stocks/stocksAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const StockFilter = ({filterStocks, clearFilter, stocks:{filtered}}) => {
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

StockFilter.prototype = {
    filterStocks:PropTypes.func.isRequired, 
    clearFilter:PropTypes.func.isRequired,
    filtered:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    stocks: state.stocks
});

export default connect(mapStateToProps,{filterStocks, clearFilter})(StockFilter)