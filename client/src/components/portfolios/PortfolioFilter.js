import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { clearFilter, filterPortfolios } from '../../state/portfolios/portfolioActions'
import PropTypes from 'prop-types'

const PortfolioFilter = ({portfolios:{filtered}, filterPortfolios,clearFilter}) => {
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


PortfolioFilter.propTypes = {
    portfolios: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    portfolios:state.portfolios
});

export default connect(mapStateToProps, {clearFilter, filterPortfolios})(PortfolioFilter)
