import React, { useState } from "react";
import {
  addPortfolio
} from "../../state/portfolios/portfolioActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PortfolioForm = ({
  addPortfolio
}) => {
  const [portfolio, setPortfolio] = useState({
    name: "",
    date: Date.now()
  });

  const onChange = e =>
    setPortfolio({ ...portfolio, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
      addPortfolio(portfolio);
      setPortfolio({
        name: "",
        date: Date.now()
      });
  };

  const { name } = portfolio;

  return (
    <div className="container border mt-1">
      <form className="form p-2" onSubmit={onSubmit}>
        <h2 className="form-title">
          Add Portfolio
        </h2>
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Portfolio
        </button>
      </form>
    </div>
  );
};

PortfolioForm.propTypes = {
  portfolios: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  portfolios: state.portfolios
});

export default connect(
  mapStateToProps,
  { addPortfolio }
)(PortfolioForm);
