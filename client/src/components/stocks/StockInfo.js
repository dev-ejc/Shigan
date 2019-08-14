import React from "react";
import PropTypes from 'prop-types'

const StockInfo = ({shares, price}) => {
  return (
    <table className="table table-bordered">
      <tbody>
        <tr key={"name"}>
          <td className="text-right">Name</td>
          <td>{price.companyName}</td>
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
  );
};
StockInfo.propTypes = {
    price: PropTypes.object.isRequired,
}

export default StockInfo;
