import React , {  useEffect }from 'react'
import PortfolioItem from './PortfolioItem'
import { getPortfolios } from '../../state/portfolios/portfolioActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//@TODO transition-groups are not functioning
//@TODO improve scope of loading to all Portfolio items
const Portfolios = ({portfolios: {portfolios,loading,filtered}, getPortfolios}) => {
    let data = portfolios
    useEffect(() => {
        getPortfolios()
    },
    [])

    if (filtered !== null) {
        data = filtered
    }

    return (
        <div className='container'>
            { portfolios !== null && !loading ? (
                 data.map(portfolio => (
                     <PortfolioItem key={portfolio._id}  portfolio={portfolio}/>)
            )) : <div class="spinner-border text-center" role="status">
            <span class="sr-only">Loading...</span>
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