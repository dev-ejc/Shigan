import React, { useContext } from 'react'
import StockContext from '../../context/stocks/stockContext'
import Spinner from '../../components/layout/Spinner'
import StockItem from './StockItem';

const Stocks = props => {
    let stockContext = useContext(StockContext)
    let { stocks, loading } = stockContext;
    if (loading) {
        return (
            <Spinner />
        )
    } else {
    return (
            <div className="card-columns" style={cardStyle}>
                {stocks.map(stock => (
                    <StockItem key={stock["1. symbol"]} data={stock}/>
                ))}
            </div>
        )
    }
}

const cardStyle={
    display:'grid',
    gridGap:'1rem',
    gridTemplateColumns:'repeat(3,1fr)'
}

export default Stocks
