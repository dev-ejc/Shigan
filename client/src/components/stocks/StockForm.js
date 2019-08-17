import React, { useState } from "react";
import { addStock } from "../../state/stocks/stocksAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const StockForm = ({addStock}) => {
  const [stock, setStock] = useState({
    ticker: "",
    shares: 0,
    date: Date.now()
  });

  const onChange = e => setStock({ ...stock, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addStock(stock);
    setStock({
      ticker: "",
      shares: 0,
      date: Date.now()
    });
  };
  const { shares, ticker } = stock;
  return (
    <div className="container border mt-1">
      <form className="form p-2" onSubmit={onSubmit}>
        <h2 className="form-title">Add Stock</h2>
        <div className="form-group">
          <label htmlFor="ticker">Ticker</label>
          <input
            className="form-control"
            type="text"
            name="ticker"
            placeholder="Ticker"
            value={ticker}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shares">Shares</label>
          <input
            className="form-control"
            type="integer"
            name="shares"
            placeholder={0}
            value={shares}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Stock
        </button>
      </form>
    </div>
  );
};

StockForm.prototype = {
  addStock: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  { addStock }
)(StockForm);
