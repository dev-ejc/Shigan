import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  deleteStock,
  setCurrentStock,
  clearCurrentStock,
  updateCurrentStock
} from "../../state/stocks/stocksAction";
import { deletePrice } from "../../state/prices/pricesActions";

import { connect } from "react-redux";

const StockItem = ({ price, stock }) => {
  const { companyName, image } = price;
  const { _id, ticker } = stock;
  const [tweak, setTweak] = useState(false);
  const [stateStock, setStateStock] = useState({});

  useEffect(() => {
    setStateStock(stock);
  }, [stock]);

  const toggle = () => {
    setTweak(!tweak);
  };

  const onChange = e => {
    setStateStock({ ...stateStock, [e.target.name]: e.target.value });
  };

  const onDelete = () => {
    console.log(_id);
    deleteStock(_id);
  };

  const onSubmit = e => {
    e.preventDefault();
    updateCurrentStock(stateStock);
    toggle();
  };

  const { shares } = stateStock;
  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body align-content-center">
        <h3 className="card-title text-dark text-center">{ticker}</h3>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={image} className="card-img my-auto mx-auto" />
          </div>
          <div className="col-md-8">
            <table className="table table-bordered">
              <tbody>
                <tr key={"name"}>
                  <td className="text-right">Name</td>
                  <td>{companyName}</td>
                </tr>
                <tr key={"price"}>
                  <td className="text-right">Price</td>
                  <td>{price.price}</td>
                </tr>
                <tr key={"shares"}>
                  <td className="text-right">Shares</td>
                  {!tweak ? (
                    <td>{shares}</td>
                  ) : (
                    <td><form className="form-inline" onSubmit={onSubmit}>
                      <div className="form-group">
                        <input
                          htmlFor="shares"
                          className="form-control"
                          type="integer"
                          name="shares"
                          placeholder={0}
                          value={shares}
                          onChange={onChange}
                        />
                      </div>
                    </form></td>
                  )}
                </tr>
              </tbody>
            </table>
            {tweak && (
              <div>
                <button onClick={onDelete} className="btn btn-danger btn-block">
                  Delete
                </button>
              </div>
            )}
            <button
              onClick={() => toggle()}
              className="btn btn-dark  btn-block"
            >
              {tweak ? "Clear" : "Edit"}
            </button>
          </div>
        </div>
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
