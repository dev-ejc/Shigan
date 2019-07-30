import React from 'react'
import Stocks from '../stocks/Stocks'
import StockForm from '../stocks/StockForm'
import StockFilter from '../stocks/StockFilter'

const Portfolio = () => {
    return (
        <div className="container mt-2">
            {/* <div className="col">
                <div className="row">
                    <Visuals />
                </div>
                <div className="row">
                    <News />
                </div>
            </div> */}
            <div className="col">
                <div className="row">
                    <StockFilter />
                </div>
                <div className="row">
                    <StockForm />
                </div>
                <div className="row">
                    <Stocks />
                </div>
            </div>
        </div>
    )
}

export default Portfolio