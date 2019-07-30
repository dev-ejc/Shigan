import React, { useContext } from 'react'
import PortfolioContext from '../../context/portfolios/portfolioContext'
import PropTypes from 'prop-types'

const PortfolioItem = ({ portfolio }) => {
    const portfolioContext = useContext(PortfolioContext)
    const { deletePortfolio, setCurrentPortfolio, clearCurrentPortfolio } = PortfolioContext
    const { _id, name } = portfolio

    const onDelete = () => {
        deletePortfolio(_id)
        clearCurrentPortfolio()
    }

    return (
        <div className="card bg-secondary mt-1">
            <div className="card-body">
            <h3 className="card-title text-dark text-left">
                {name}
            </h3>
            <table className="table table-bordered">
                <tbody>
                    <tr key="name">
                        <td className="text-right">name</td>
                        <td>{portfolio.startDate}</td>
                    </tr>
                    <tr key='date'>
                        <td className="text-right">date</td>
                    <td>{portfolio.date}</td>
                </tr>
                </tbody>
            </table>
                <div className="container text-center mx-auto">
                    <button onClick={() => setCurrentPortfolio(portfolio)} className="btn btn-dark  btn-block">Edit</button>
                    <button onClick={onDelete} className="btn btn-danger btn-block">Delete</button>
                </div>
            </div>
        </div>
    )       
}

PortfolioItem.propTypes = {
    portfolio : PropTypes.object.isRequired
}

export default PortfolioItem