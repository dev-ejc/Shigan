import React, { useState, Fragment, useEffect } from "react";
import {
  setCurrentPortfolio,
  updateCurrentPortfolio,
  deletePortfolio
} from "../../state/portfolios/portfolioActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const PortfolioItem = ({
  portfolio,
  setCurrentPortfolio,
  updateCurrentPortfolio,
  deletePortfolio
}) => {

  const [tweak, setTweak] = useState(false);
  const [statePortfolio, setStatePortfolio] = useState({
    name: "",
    openDate: "0000-00-00T00"
  });

  const onInfo = () => {
    setCurrentPortfolio(portfolio);
  };

  useEffect(() => {
    setStatePortfolio(portfolio);
  },//eslint-disable-next-line 
  []);

  const onChange = e =>
    setStatePortfolio({ ...statePortfolio, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setTweak(false);
    updateCurrentPortfolio(statePortfolio);
  };

  const onDelete = () => {
    deletePortfolio(_id);
  };

  const { openDate, _id } = portfolio;
  const { name } = statePortfolio;
  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body">
        {tweak ? (<form className="form p-2" onSubmit={onSubmit}>
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
      <button onClick={onDelete} className="btn btn-danger btn-block">
        Delete
      </button>
    </form>) : (
            <Fragment>
            <h3 className="card-title text-dark text-center">{name}</h3>
            <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="text-right">Open Date</td>
                    <td>{openDate.split("T")[0]}</td>
                  </tr>
                </tbody>
              </table>
              </Fragment>
        )}
        <button
          onClick={() => setTweak(!tweak)}
          className="btn btn-dark  btn-block"
        >
          {tweak ? "Back" : "Edit"}
        </button>
        {!tweak && <Link
          onClick={onInfo}
          to={"/Portfolio"}
          className="btn btn-primary btn-block"
        >
          Info
        </Link>}
      </div>
    </div>
  );
};

PortfolioItem.propTypes = {
  portfolio: PropTypes.object.isRequired,
  setCurrentPortfolio: PropTypes.func.isRequired,
  updateCurrentPortfolio: PropTypes.func.isRequired,
  deletePortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    setCurrentPortfolio,
    updateCurrentPortfolio,
    deletePortfolio
  }
)(PortfolioItem);
