import React , { useContext, useEffect }from 'react'
import PortfolioContext from '../../context/portfolios/portfolioContext'
import PortfolioItem from './PortfolioItem'

//@TODO transition-groups are not functioning
//@TODO improve scope of loading to all Portfolio items
const Portfolios = () => {
    const portfolioContext = useContext(PortfolioContext)
    const { portfolios, loading, filtered, getPortfolios} = portfolioContext
    let data = portfolios

    useEffect(() => {
        getPortfolios()
    }, //eslint-disable-next-line
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

export default Portfolios