import React, { useState, useEffect } from "react";
import {deleteStock, updateCurrentStock } from '../../state/stocks/stocksAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const StockEdit = ({ stock }) => {
  const [stateStock, setStateStock] = useState({
      shares:0
  });

  useEffect(() => {
    setStateStock(stock);
  }, [stock]);

  const { _id, shares } = stateStock;
  const onChange = e => {
    setStateStock({ ...stateStock, [e.target.name]: e.target.value });
  };

  const onDelete = () => {
    deleteStock(_id);
  };

  const onSubmit = e => {
    e.preventDefault();
    updateCurrentStock(stateStock);
  };

  return (
      <form className="form-inline" onSubmit={onSubmit}>
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
        <button type="submit" className="btn form-control">Update</button>
        <button onClick={onDelete} className="btn btn-danger btn-block">
          Delete
        </button>
      </form>
  );
};

StockEdit.prototype = {
    deleteStock: PropTypes.func.isRequired,
    updateCurrentStock: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({});
  
  export default connect(
    mapStateToProps,
    { deleteStock, updateCurrentStock }
  )(StockEdit);
