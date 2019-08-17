import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import Stocks from '../stocks/Stocks'
import StockForm from '../stocks/StockForm'
import { getStocks } from "../../state/stocks/stocksAction";
import PropTypes from "prop-types"

const User = ({getStocks}) => {
  const [tweak, setTweak] = useState(false);

  const toggle = () => {
    setTweak(!tweak);
  }

  useEffect(
    () => {
      getStocks();
    }, //eslint-disable-next-line
    []
  );

  return (
    <div className="container mt-2">
      <div className="row">
          <div className="col">
            <button onClick={toggle}className="button btn-primary btn-block mb-2">Purchase Stock</button>
            {tweak ? <StockForm /> : <Stocks />}
          </div>
        </div>
    </div>
  );
};

User.propTypes = {
  getStocks : PropTypes.func.isRequired
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps, {getStocks})(User);
