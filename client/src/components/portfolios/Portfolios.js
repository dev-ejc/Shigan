import React , { useContext, useEffect }from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PortfolioContext from '../../context/portfolios/portfolioContext'
import PortfolioItem from './PortfolioItem'

//@TODO transition-groups are not functioning
//@TODO improve scope of loading to all Portfolio items
const Portfolios = () => {
    const portfolioContext = useContext(PortfolioContext)
    const { portfolios, loading, filtered, getPortfolios} = PortfolioContext
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
            {Portfolios !== null && !loading ? (
                 <TransitionGroup>
                 {data.map(Portfolio => (
                 <CSSTransition key={Portfolio._id} timeout={500} className="item">
                     <PortfolioItem Portfolio={Portfolio} />
                 </CSSTransition>))}
             </TransitionGroup>
            ) : <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
           </div>}      
        </div>
    )
}

export default Portfolios