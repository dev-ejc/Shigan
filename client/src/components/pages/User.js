import React, { useEffect } from "react";
import Portfolios from "../portfolios/Portfolios";
import PortfolioForm from "../portfolios/PortfolioForm";
import PortfolioFilter from "../portfolios/PortfolioFilter";
//import UserCard from "../../auth/UserCard";
import News from "../news/News";
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
      <div className="row">
    {/* <div className="row">
          <UserCard />
        </div> */}
        <div className="col">
          {/* <PortfolioForm /> */}
          {/* <PortfolioFilter /> */}
          <Portfolios />
        </div>
        {/* <div className='col'>
          <News />
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = state =>({

})

export default connect(mapStateToProps, {})(User);
