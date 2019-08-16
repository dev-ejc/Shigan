import React, { useState } from "react";
import Stocks from "../stocks/Stocks";
import StockForm from "../stocks/StockForm";
// import StockFilter from '../stocks/StockFilter'
// import News from '../news/News'
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Portfolio = ({
  portfolios: { current },
  stocks: { stocks, loading }
}) => {
  const [tweak, setTweak] = useState(false);
  if (loading || stocks === null) {
    return (<div />);
  } else {
    const value = stocks.reduce((a, b) => {
      return a + b.price["price"];
    }, 0);
    return (
      <div className="container mt-2 justify-contents-center align-items-center">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-primary text-center m-1">
              {current.name}
            </h1>
            <h1 className="card-text text-primary text-center m-1">{value}</h1>
          </div>
          <button
            onClick={() => setTweak(!tweak)}
            className="btn btn-dark  btn-block"
          >
            Add Stock
          </button>
        </div>
        {tweak ? <StockForm /> : <Stocks />}
      </div>
    );
  }
};

Portfolio.propTypes = {
  stocks: PropTypes.object.isRequired,
  portfolios: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  stocks: state.stocks,
  portfolios: state.portfolios
});
export default connect(
  mapStateToProps,
  {}
)(Portfolio);