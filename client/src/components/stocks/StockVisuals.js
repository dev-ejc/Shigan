import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
const StockVisuals = ({stocks:{stocks,loading}}) => {
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
        // return (<VictoryChart
        //     theme={VictoryTheme.material}
        //   >
        //     <VictoryLine
        //       style={{
        //         data: { stroke: "#c43a31" },
        //         parent: { border: "1px solid #ccc"}
        //       }}
        //       data={}
        //     />
        //   </VictoryChart>)

        return(<h1 className="text-primary text-center mb-2">{`$${Math.round(100 * value)/100}`}</h1>)
    }
}

StockVisuals.propTypes = {
    stocks: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ( {
    stocks: state.stocks
})

export default connect(mapStateToProps,{})(StockVisuals)
