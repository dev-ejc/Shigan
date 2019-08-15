import React, { useEffect, useState } from "react";
import {
  updateCurrentPortfolio,
  deletePortfolio
} from "../../state/portfolios/portfolioActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PortfolioEdit = ({
  portfolio,
  deletePortfolio,
  updateCurrentPortfolio
}) => {

  const [statePortfolio, setStatePortfolio] = useState({
    name: "",
    openDate: "0000-00-00T00"
  });
  const { _id } = portfolio;
  
  useEffect(() => {
    setStatePortfolio(portfolio);
  }, []);

  const onChange = e =>
    setStatePortfolio({ ...statePortfolio, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateCurrentPortfolio(statePortfolio);
  };

  const onDelete = () => {
    deletePortfolio(_id);
  };

  return (
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
      <button onClick={onDelete} className="btn btn-danger btn-block">
        Delete
      </button>
    </form>
  );
};

PortfolioEdit.propTypes = {
  portfolio: PropTypes.object.isRequired,
  deletePortfolio: PropTypes.func.isRequired,
  updateCurrentPortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    deletePortfolio,
    updateCurrentPortfolio
  }
)(PortfolioEdit);
