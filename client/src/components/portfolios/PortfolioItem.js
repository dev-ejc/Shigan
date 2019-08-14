import React, { useState, useEffect } from "react";
import {
  setCurrentPortfolio,
  clearCurrentPortfolio,
  updateCurrentPortfolio,
  deletePortfolio
} from "../../state/portfolios/portfolioActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const PortfolioItem = ({
  portfolio,
  deletePortfolio,
  setCurrentPortfolio,
  updateCurrentPortfolio
}) => {
  const { _id } = portfolio;
  const [tweak, setTweak] = useState(false);
  const [statePortfolio, setStatePortfolio] = useState({
      name: '',
      openDate: "0000-00-00T00"
  });

  useEffect(() => {
    setStatePortfolio(portfolio);
  }, [portfolio]);

  const onDelete = () => {
    deletePortfolio(_id);
  };

  const onInfo = () => {
    setCurrentPortfolio(portfolio);
  };

  const onChange = e =>
  setStatePortfolio({ ...statePortfolio, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateCurrentPortfolio(statePortfolio);
    setTweak(false)
  };

  const { name, openDate } = statePortfolio

  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body">
        {tweak ? (
          <form className="form p-2" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="name"
                value={statePortfolio.name}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Update
            </button>
          </form>
        ) : (
          <h3 className="card-title text-dark text-center">{name}</h3>
        )}
        <div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="text-right">Open Date</td>
                <td>{openDate.split("T")[0]}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container text-center mx-auto">
          <button onClick={() => setTweak(!tweak)} className="btn btn-dark  btn-block">
            Tweak
          </button>
          <button onClick={onDelete} className="btn btn-danger btn-block">
            Delete
          </button>
          <Link
            onClick={onInfo}
            to={"/Portfolio"}
            className="btn btn-primary btn-block"
          >
            Info
          </Link>
        </div>
      </div>
    </div>
  );
};

PortfolioItem.propTypes = {
  portfolio: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { setCurrentPortfolio, clearCurrentPortfolio, deletePortfolio, updateCurrentPortfolio }
)(PortfolioItem);
