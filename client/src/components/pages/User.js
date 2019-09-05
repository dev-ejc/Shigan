import React, { useEffect } from "react";
import { connect } from 'react-redux'
import Stocks from '../stocks/Stocks'
import StockForm from '../stocks/StockForm'
import Search from '../stocks/Search'
import { getHistorical, getStocks,setInfo, setUpdate } from "../../state/stocks/stocksAction";
import PropTypes from "prop-types"
import StockVisuals from "../stocks/StockVisuals";

const User = ({getHistorical, getStocks, setInfo, setUpdate, stocks:{historical, update, loading,stocks}}) => {
  useEffect(
    () => {
      
        getStocks();
        getHistorical();
    }, //eslint-disable-next-line
    []
  );

  const toggle = () => {
    if(update) {
      setInfo()
    } else {
      setUpdate()
    }
  }
  if (loading || stocks === null) {
    return (<div className="d-flex justify-content-center">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div>)
  } else {
  return (
    <div className="container mt-2">
      <div className="row">
          <div className="col">
            <StockVisuals data={historical}/>
            <button onClick={toggle}className="button btn-primary btn-block mb-2">Purchase Stock</button>
            {update? <Search /> : <Stocks />}
          </div>
        </div>
    </div>
  );
};
}
User.propTypes = {
  getStocks : PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  stocks:state.stocks
})

export default connect(mapStateToProps, {getStocks, setUpdate, getHistorical, setInfo})(User);
