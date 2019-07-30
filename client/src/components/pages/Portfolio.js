import React, { useContext, useEffect } from 'react'
import Stocks from '../stocks/Stocks'
import StockForm from '../stocks/StockForm'
import StockFilter from '../stocks/StockFilter'
import AuthContext from '../../context/auth/authContext'

const Portfolio = () => {
    const authContext = useContext(AuthContext)
    const { loadUser } = authContext

    useEffect(() => {
        loadUser()
    }, //eslint-disable-next-line
    [])
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