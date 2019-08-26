import React from 'react'
import StockItem from './StockItem'
import "./Stocks.css";
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
            <div className='card-columns' style={style}>
                     {data.map((stock) => (
                            <StockItem  key={stock["stock"]._id} stock={stock["stock"]} price={stock["price"]} />
                    ))}      
            </div>)
    }
}

const style = {
    display: "grid",
    gridGap: '1rem',
    gridTemplateColumns: "repeat(1fr)",

}

Stocks.propTypes = {
    stocks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    stocks:state.stocks,
});

export default connect(mapStateToProps, { getStocks })(Stocks)