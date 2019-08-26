import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
const StockVisuals = ({data,stocks:{stocks,loading}}) => {
    if(stocks === null || loading) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    } else {
        const value = stocks.reduce((a,b) => {
            return a + (b.stock.shares * b.price.price)
        },0)
        return (
            <div className="container">
            <VictoryChart>
            <VictoryAxis dependentAxis
            fixLabelOverlap={true}/> 
            <VictoryLine
              data={data}
              scale={{x:"time",y:"linear"}}
              x="date"
              y="close"
            />
            </VictoryChart>
            <h1 className="text-primary text-center mb-2">{`$${Math.round(100 * value)/100}`}</h1>
            </div>)
    }
}

StockVisuals.propTypes = {
    stocks: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ( {
    stocks: state.stocks
})

export default connect(mapStateToProps,{})(StockVisuals)
