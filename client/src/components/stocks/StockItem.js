import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { setCurrentStock, deleteStock, updateCurrentStock } from "../../state/stocks/stocksAction";
import { connect } from "react-redux";

const StockItem = ({ price, stock, deleteStock, updateCurrentStock }) => {
  const [tweak, setTweak] = useState(false);
  const toggle = () => {
    setTweak(!tweak);
  };

  const [stateStock, setStateStock] = useState({
    shares:0
});

useEffect(() => {
  setStateStock(stock);
}, //eslint-disable-next-line
 []);

const { _id } = stock;
const { shares } = stateStock
const { companyName, image } = price
const onChange = e => {
  setStateStock({ ...stateStock, [e.target.name]: e.target.value });
};

const onDelete = () => {
  deleteStock(_id);
};

const onSubmit = e => {
  e.preventDefault();
  setTweak(false)
  updateCurrentStock(stateStock);
};

  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body align-content-center">
        <h3 className="card-title text-dark text-center">{stock.ticker}</h3>
            <img src={image} className="card-img-top mx-auto"alt="logo" />
            {tweak ? (
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
            ) : (
              <Fragment>
              <table className="table table-bordered table-responsive">
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
                    <td>{shares}</td>
                  </tr>
              </tbody>
            </table>
            </Fragment>
            )}
            <button
              onClick={() => toggle()}
              className="btn btn-dark  btn-block"
            >
              {tweak ? "Back" : "Edit"}
            </button>
          </div>
        </div>
  );
};

StockItem.prototype = {
  setCurrentStock: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired, 
  updateCurrentStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { setCurrentStock, deleteStock, updateCurrentStock }
)(StockItem);
