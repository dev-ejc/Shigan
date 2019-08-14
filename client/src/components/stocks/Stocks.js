import React , { useEffect, useState }from 'react'
import StockItem from './StockItem'
import StockForm from './StockForm'
import PriceItem from '../prices/PriceItem'
import { getPrices } from '../../state/prices/pricesActions'
import { getStocks } from '../../state/stocks/stocksAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getHistoricalPrices } from '../../state/prices/pricesActions'
//@TODO transition-groups are not functioning
//@TODO improve scope of loading to all stock items
const Stocks = ({portfolios:{current},prices:{prices}, getHistoricalPrices, stocks:{stocks,loading,filtered}, getStocks}) => {
    
    let data = stocks

    const [tweak, setTweak] = useState(false)

    useEffect(() => {
        //getHistoricalPrices(current._id)
        //getPrices(current._id)
        getStocks(current._id)
    }, //eslint-disable-next-line
    [])

    if (filtered !== null) {
        data = filtered
    }

    //@TODO Gotta improve tracking loading states
    return (
        <div className='container'>
             <button onClick={() => setTweak(!tweak)} className="btn btn-dark  btn-block">
            Add Stock
          </button>
            {stocks !== null && !loading && !tweak ? (
                 data.map((stock) => (
                     <div className="container">
                        <StockItem key={stock["stock"]._id} stock={stock["stock"]} price={stock["price"]} />
                    </div>
                ))
            ) : tweak ? <StockForm /> :  <div class="spinner-border" role="status">
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

export default connect(mapStateToProps, { getPrices,getStocks })(Stocks)