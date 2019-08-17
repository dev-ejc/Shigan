import React, { useEffect } from "react";
import Portfolios from "../portfolios/Portfolios";
import { loadUser } from '../../state/auth/authAction'
import { connect } from 'react-redux'
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
    </div>
  );
};

const mapStateToProps = state =>({

})

export default connect(mapStateToProps, {})(User);
