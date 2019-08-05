import React, { useState, useEffect } from 'react'
import { addPortfolio, updateCurrentPortfolio, clearCurrentPortfolio } from '../../state/portfolios/portfolioActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PortfolioForm = ({portfolios:{current}, addPortfolio,updateCurrentPortfolio,clearCurrentPortfolio}) => {

    const [portfolio, setPortfolio] =  useState({
        name:'',
        date: Date.now()
    })

    useEffect(() => {
        if(current !== null) {
            setPortfolio(current)
        } else {
            setPortfolio(
                {
                    name:'',
                    date: Date.now()
                }
            )
        }
    },[current])

    const onChange = e => setPortfolio({...portfolio,
            [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if(current) {
            updateCurrentPortfolio(portfolio)
            clearCurrentPortfolio()
        } else {
            addPortfolio(portfolio)
            setPortfolio(
                {
                    name:'',
                    date: Date.now()
                }
            )
        }
    }

    const clearAll = () => {
        clearCurrentPortfolio()
    }

    const { name } = portfolio

    return (
            <div className="container border mt-1">
            <form className="form p-2" onSubmit={onSubmit}>
                <h2 className='form-title'>{current ? 'Update Portfolio' : 'Add Portfolio'}</h2>
                <div className="form-group">
                    <label htmlFor="name">name</label>                
                    <input className="form-control" 
                        type="text"
                        name="name"
                        placeholder="name"
                        value={name}
                        onChange={onChange}/>
                </div>
                    <button type="submit" className="btn btn-primary btn-block">{current ? 'Update Portfolio' : 'Add Portfolio'}</button>
                    {current && <button onClick={clearAll} type="submit" className="btn btn-secondary btn-block">Clear All</button>}
            </form>
            </div>
    )
}

PortfolioForm.propTypes = {
    portfolios: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    portfolios:state.portfolios
});

export default connect(mapStateToProps, {addPortfolio, updateCurrentPortfolio, clearCurrentPortfolio})(PortfolioForm)