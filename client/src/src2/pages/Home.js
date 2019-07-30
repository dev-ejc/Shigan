import React, { Fragment } from 'react'
import Search from '../components/stocks/Search'
import Stocks from '../components/stocks/Stocks'

const Home = props => {
    return (
        <Fragment>
            <Search />
            <Stocks />
        </Fragment>
    )
}

export default Home
