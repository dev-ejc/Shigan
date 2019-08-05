import React , { useEffect }from 'react'
import StockItem from './StockItem'
import { getPrices } from '../../state/prices/pricesActions'
import { getStocks } from '../../state/stocks/stocksAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//@TODO transition-groups are not functioning
//@TODO improve scope of loading to all stock items
const Stocks = ({portfolios:{current},prices:{prices}, getPrices, stocks:{stocks,loading,filtered}, getStocks}) => {
    
    let data = stocks

    useEffect(() => {
        getPrices(current._id)
        getStocks(current._id)
    }, //eslint-disable-next-line
    [])

    if (filtered !== null) {
        data = filtered
    }

    //@TODO Gotta improve tracking loading states
    return (
        <div className='container'>
            {stocks !== null && !loading && prices !== null ? (
                 data.map((stock,index) => (
                     <StockItem key={stock._id} price={prices[index]} stock={stock} />
                     ))
            ) : <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
           </div>}      
        </div>
    )
}

Stocks.propTypes = {
    prices: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    prices:state.prices,
    stocks:state.stocks,
    portfolios:state.portfolios
});

export default connect(mapStateToProps, {getPrices,getStocks})(Stocks)