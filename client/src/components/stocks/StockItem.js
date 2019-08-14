import React, { useState } from "react";
import PropTypes from "prop-types";
import { setCurrentStock } from "../../state/stocks/stocksAction";
import { connect } from "react-redux";
import StockEdit from "./StockEdit";
import StockInfo from"./StockInfo";

const StockItem = ({ price, stock }) => {
  const [tweak, setTweak] = useState(false);
  const toggle = () => {
    setTweak(!tweak);
  };
  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body align-content-center">
        <h3 className="card-title text-dark text-center">{stock.ticker}</h3>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={price.image} className="card-img my-auto mx-auto" />
          </div>
          <div className="col-md-8">
            {tweak ? (
              <StockEdit stock={stock} />
            ) : (
              <StockInfo price={price} shares={stock.shares} />
            )}
            <button
              onClick={() => toggle()}
              className="btn btn-dark  btn-block"
            >
              {tweak ? "Back" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

StockItem.prototype = {
  setCurrentStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { setCurrentStock }
)(StockItem);
