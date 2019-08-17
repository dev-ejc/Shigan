import React from 'react'
import StockItem from './StockItem'
import { getStocks } from '../../state/stocks/stocksAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Stocks = ({stocks:{stocks,loading}}) => {
    let data = stocks
    if (stocks === null || loading ) {
        return (<div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
       </div>)
    } else {
        return (
            <div className='container'>
                     {data.map((stock) => (
                         <div className="container">
                            <StockItem key={stock["stock"]._id} stock={stock["stock"]} price={stock["price"]} />
                        </div>
                    ))}      
            </div>)
    }
}

Stocks.propTypes = {
    stocks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    stocks:state.stocks,
});

export default connect(mapStateToProps, { getStocks })(Stocks)