import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const StockVisuals = ({stocks:{stocks,loading}}) => {
    if(stocks === null || loading) {
        return (
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    } else {
        const value = stocks.reduce((a,b) => {
            return a + (b.stock.shares * b.price.price)
        },0)
        return(<h1 className="text-primary text-center mb-2">{`$${value}`}</h1>)
    }
}

StockVisuals.propTypes = {
    stocks: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ( {
    stocks: state.stocks
})

export default connect(mapStateToProps,{})(StockVisuals)
