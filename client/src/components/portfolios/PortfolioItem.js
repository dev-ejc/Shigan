import React, { useState } from "react";
import {
  setCurrentPortfolio
} from "../../state/portfolios/portfolioActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PortfolioInfo from "./PortfolioInfo";
import PortfolioEdit from "./PortfolioEdit";

const PortfolioItem = ({
  portfolio,
  setCurrentPortfolio
}) => {
  const [tweak, setTweak] = useState(false);
  const onInfo = () => {
    setCurrentPortfolio(portfolio);
  };

  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body">
        {tweak ? <PortfolioEdit portfolio={portfolio}/> : <PortfolioInfo portfolio={portfolio}/>}
        <button
          onClick={() => setTweak(!tweak)}
          className="btn btn-dark  btn-block"
        >
          Tweak
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
  );
};

PortfolioItem.propTypes = {
  portfolio: PropTypes.object.isRequired,
  setCurrentPortfolio: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    setCurrentPortfolio
  }
)(PortfolioItem);
