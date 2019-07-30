import React, { useContext, useRef, useEffect } from 'react'
import PortfolioContext from '../../context/portfolios/portfolioContext'

const PortfolioFilter = () => {
    const portfolioContext = useContext(PortfolioContext)
    const { filterPortfolios, clearFilter, filtered} = portfolioContext
    const text = useRef('')

    useEffect(() => {
        if(filtered === null) {
            text.current.value = ''
        }
    })

    const onChange = e => {
        if(text.current.value !== '') {
            filterPortfolios(e.target.value)
        } else {
            clearFilter()
        }
    }
    
    return (
        <form>
            <div className="form-group">
                <input className="form-control" ref={text} type="text" onChange={onChange}/>
            </div>
        </form>
    )
}

export default PortfolioFilter
