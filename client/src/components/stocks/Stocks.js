import React , { useContext, useEffect }from 'react'
import StockContext from '../../context/stocks/stockContext'
import PortfolioContext from '../../context/portfolios/portfolioContext'
import StockItem from './StockItem'

//@TODO transition-groups are not functioning
//@TODO improve scope of loading to all stock items
const Stocks = () => {
    const stockContext = useContext(StockContext)
    const portfolioContext = useContext(PortfolioContext)
    const { stocks, loading, filtered, getStocks} = stockContext
    let data = stocks

    useEffect(() => {
        getStocks(portfolioContext.current._id)
    }, //eslint-disable-next-line
    [])

    if (filtered !== null) {
        data = filtered
    }

    return (
        <div className='container'>
            {stocks !== null && !loading ? (
                 data.map(stock => (
                     <StockItem key={stock._id} stock={stock} />
                     ))
            ) : <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
           </div>}      
        </div>
    )
}

export default Stocks