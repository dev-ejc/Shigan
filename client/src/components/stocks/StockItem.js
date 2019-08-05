import React from "react";
import PropTypes from "prop-types";
import {
  deleteStock,
  setCurrentStock,
  clearCurrentStock
} from "../../state/stocks/stocksAction";
import { connect } from "react-redux";

const StockItem = ({
  price,
  stock,
  deleteStock,
  setCurrentStock,
  clearCurrentStock
}) => {
  const { _id, ticker, shares } = stock;

  const onDelete = () => {
    deleteStock(_id);
    clearCurrentStock();
  };

  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body">
        <h3 className="card-title text-dark text-left">{ticker}</h3>
        <table className="table table-bordered">
          <tbody>
            {Object.keys(price).map(key => {
              return (
                <tr key={key}>
                  <td className="text-right">{key}</td>
                  <td>{price[key]}</td>
                </tr>
              );
            })}
            <tr key={"shares"}>
              <td className="text-right">Shares</td>
              <td>{shares}</td>
            </tr>
          </tbody>
        </table>
        <div className="container text-center mx-auto">
          <button
            onClick={() => setCurrentStock(stock)}
            className="btn btn-dark  btn-block"
          >
            Edit
          </button>
          <button onClick={onDelete} className="btn btn-danger btn-block">
            Delete
          </button>
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
  { deleteStock, setCurrentStock, clearCurrentStock }
)(StockItem);
