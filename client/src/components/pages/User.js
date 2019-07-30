import React, { useContext, useEffect } from "react";
import Portfolios from "../portfolios/Portfolios";
import PortfolioForm from "../portfolios/PortfolioForm";
import PortfolioFilter from "../portfolios/PortfolioFilter";
import AuthContext from "../../context/auth/authContext";
//import UserCard from "../../auth/UserCard";
//import News from "../../news/News";

const User = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(
    () => {
      loadUser();
    }, //eslint-disable-next-line
    []
  );
  return (
    <div className="container mt-2">
      <div className="col">
        {/* <div className="row">
          <UserCard />
        </div> */}
        <div className="row">
          <PortfolioForm />
        </div>
        <div className="row">
          <PortfolioFilter />
        </div>
        <div className="row">
          <Portfolios />
        </div>
      </div>
      {/* <div className='col'>
          <div className="row">
              <News />
          </div>
      </div> */}
    </div>
  );
};

export default User;
