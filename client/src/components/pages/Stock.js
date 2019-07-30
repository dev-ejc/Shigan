import React, {Fragment, useEffect, useState} from 'react'
import Spinner from '../components/layout/Spinner'
import PropTypes from 'prop-types'
import Plot from 'react-plotly.js';
import axios from 'axios'

const StockPage = ({match}) => {
    const [quote,setQuote] = useState(null)
    const [monthly,setMonthly] = useState(null)

    const callAvantageSymbol = async (symbol,f) => {
        const abortController = new AbortController()
        const signal = abortController.signal
        const res = await axios(
                "https://www.alphavantage.co/query", 
                 { signal:signal,
                    params: {
                "function":f,
                "symbol":symbol,
                "apikey":process.env.REACT_APP_ALPHAVANTAGE_KEY
            }})
        abortController.abort()
        return res.data
        } 
    
    useEffect(() => {
        async function fetchData() {
            let monthly = await callAvantageSymbol(match.params.symbol,"TIME_SERIES_MONTHLY")
            let quote = await callAvantageSymbol(match.params.symbol,"GLOBAL_QUOTE")
            setMonthly(monthly["Monthly Time Series"])
            setQuote(quote["Global Quote"])
        }
        fetchData()
        },// eslint-disable-next-line 
    [])
    
    if ( monthly === null || quote === null) return <Spinner/>;
    return (
        <Fragment>
            <Plot className="container mx-auto"
                data={[
                {
                    x: Object.keys(monthly).map(key => key),
                    y: Object.keys(monthly).map(key => monthly[key]["4. close"]),
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'Black'},
                }
                ]}
                layout= {{autosize:true}}
                useResizeHandler={true}
            />
            <table className="table">
                <tbody>
                    {Object.keys(quote).map(key => (
                        <tr key={key}><td>{key}</td><td>{quote[key]}</td></tr>
                    ))}
                </tbody>
            </table> 
        </Fragment>
    )
}

StockPage.propTypes = {
    match: PropTypes.object.isRequired
}

export default StockPage
