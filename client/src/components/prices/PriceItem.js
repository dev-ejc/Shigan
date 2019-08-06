import React from "react";
import PropTypes from "prop-types";

const StockItem = ({ price }) => {
  return (
    <div className="card bg-secondary mt-1">
      <div className="card-body">
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

StockItem.prototype = {
  price: PropTypes.object.isRequired
};

export default StockItem;
