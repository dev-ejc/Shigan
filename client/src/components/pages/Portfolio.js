import React from 'react'
import Stocks from '../stocks/Stocks'
// import StockForm from '../stocks/StockForm'
// import StockFilter from '../stocks/StockFilter'
// import News from '../news/News'
// import Visuals from '../visuals/Visuals'

const Portfolio = () => {
    return (
        <div className="container mt-2">
        <div className="row">
      {/* <div className="row">
            <UserCard />
          </div> */}
          <div className="col">
            {/* <StockForm /> */}
            <Stocks />
            {/* <StockFilter /> */}
          </div>
          {/* <div className='col'>
            <Visuals />
            <News />
          </div> */}
        </div>
      </div>
    )
}

export default Portfolio