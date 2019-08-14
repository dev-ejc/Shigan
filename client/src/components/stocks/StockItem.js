import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  deleteStock,
  setCurrentStock,
  clearCurrentStock,
  updateCurrentStock,
} from "../../state/stocks/stocksAction";
import {
  deletePrice
} from "../../state/prices/pricesActions";

import { connect } from "react-redux";

const StockItem = ({
  price,
  stock
}) => {
  const { _id, ticker, shares } = stock;
  const { image, companyName } = price;
  const [tweak, setTweak] =  useState(false)
  const [currentStock, setCurrentStock] =  useState(
    {}
  )

  useEffect(() => {
    setCurrentStock(stock)
  },[stock])
  
  const toggle = () => {
    setTweak(!tweak)
  }

const onChange = e => {
  setCurrentStock({...currentStock,
        [e.target.name]:e.target.value}
        )
      }

  const onDelete = () => {
    console.log(_id)
    deleteStock(_id);
  };

  const onSubmit = e => {
      e.preventDefault()
      updateCurrentStock(currentStock)
      toggle()
  }
  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body align-content-center">
        <h3 className="card-title text-dark text-center">{ticker}</h3>
        <img src={image} className="card-image-top mx-auto" />
        <table className="table table-bordered">
          <tbody>
            <tr key={"name"}>
            <td className="text-right">Name</td>
              <td>{companyName}</td>
            </tr>
            {!tweak && <tr key={"shares"}>
              <td className="text-right">Shares</td>
              <td>{shares}</td>
            </tr>}
          </tbody>
        </table>
        {tweak && (
          <div>
        <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group">
                    <label htmlFor="shares">Shares</label>
                    <input className="form-control" 
                        type="integer"
                        name="shares" 
                        placeholder={0}
                        value={shares}
                        onChange={onChange}/>
                </div>
          <button type="submit" className="btn btn-primary form-control">Update</button>
        </form>
                <button onClick={onDelete} className="btn btn-danger btn-block">
                Delete
              </button>
              </div>)}

          <button
            onClick={() => toggle()}
            className="btn btn-dark  btn-block"
          >
            {tweak ? "Clear" : "Edit"}
          </button>
      </div>
    </div>
  );
};

StockItem.prototype = {
  deleteStock: PropTypes.func.isRequired,
  setCurrentStock: PropTypes.func.isRequired,
  clearCurrentStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deleteStock, setCurrentStock, clearCurrentStock, deletePrice }
)(StockItem);
