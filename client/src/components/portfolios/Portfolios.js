import React , {  useEffect, useState }from 'react'
import PortfolioItem from './PortfolioItem'
import { getPortfolios } from '../../state/portfolios/portfolioActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PortfolioForm from './PortfolioForm'

const Portfolios = ({portfolios: {portfolios,loading,filtered}, getPortfolios}) => {
    let data = portfolios
    useEffect(() => {
        getPortfolios()
    },//eslint-disable-next-line
    [])

    const [tweak, setTweak] = useState(false)

    if (filtered !== null) {
        data = filtered
    }
    return (
        <div className='container'>
            <button onClick={() => setTweak(!tweak)} className="btn btn-dark  btn-block">
            Add Portfolio
          </button>
            { portfolios !== null && !loading && !tweak ? (
                 data.map(portfolio => (
                     <PortfolioItem key={portfolio._id}  portfolio={portfolio}/>)
            )) : tweak ? <PortfolioForm /> : <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
           </div>}
        </div>
    )
}

Portfolios.propTypes = {
    portfolios: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    portfolios:state.portfolios
});

export default connect(mapStateToProps, {getPortfolios})(Portfolios)