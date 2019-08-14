import React, { useState } from 'react'
import { setCurrentPortfolio, clearCurrentPortfolio, deletePortfolio } from '../../state/portfolios/portfolioActions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PortfolioForm from './PortfolioForm'

const PortfolioItem = ({ portfolio, deletePortfolio,setCurrentPortfolio,clearCurrentPortfolio }) => {
    const { _id, name, openDate } = portfolio
    const [tweak, setTweak] = useState(false)
    const toggle =  () => setTweak(!tweak)
    const onDelete = () => {
        deletePortfolio(_id)
        clearCurrentPortfolio()
    }

    return (
        <div className="card bg-secondary mt-1">
            <div className="card-body">
            {tweak ? <PortfolioForm /> :<div><h3 className="card-title text-dark text-left">
                {name}
            </h3>
            <table className="table table-bordered">
                <tbody>
                        <tr >
                        <td className="text-right">Open Date</td>
                        <td>{openDate.split("T")[0]}</td>
                    </tr>
                </tbody>
            </table></div>}
                <div className="container text-center mx-auto">
                    <button onClick={() => {
                        toggle()
                        setCurrentPortfolio(portfolio)
                        }} className="btn btn-dark  btn-block">Edit</button>
                    <button onClick={onDelete} className="btn btn-danger btn-block">Delete</button>
                    <Link onClick={() => setCurrentPortfolio(portfolio)} to={'/Portfolio'} className="btn btn-primary btn-block">Info</Link>
                </div>
            </div>
        </div>
    )       
}

PortfolioItem.propTypes = {
    portfolio : PropTypes.object.isRequired,
    portoflios: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {setCurrentPortfolio, clearCurrentPortfolio, deletePortfolio})(PortfolioItem)
