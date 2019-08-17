import React, { useEffect } from "react";
import { loadUser } from '../../state/auth/authAction'
import { connect } from 'react-redux'
import Stocks from '../stocks/Stocks'
import StockForm from '../stocks/StockForm'
const User = () => {
  useEffect(
    () => {
      loadUser();
    }, //eslint-disable-next-line
    []
  );
  return (
    <div className="container mt-2">
          <Stocks />
          <StockForm />
    </div>
  );
};

const mapStateToProps = state =>({

})

export default connect(mapStateToProps, {})(User);
