import React, { useContext, useEffect } from "react";
import Portfolios from "../portfolios/Portfolios";
import PortfolioForm from "../portfolios/PortfolioForm";
// import PortfolioFilter from "../portfolios/PortfolioFilter";
import AuthContext from "../../context/auth/authContext";
//import UserCard from "../../auth/UserCard";
import News from "../news/News";

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
      <div className="row">
    {/* <div className="row">
          <UserCard />
        </div> */}
        <div className="col">
          <PortfolioForm />
          <PortfolioFilter />
          <Portfolios />
        </div>
        <div className='col'>
          <News />
        </div>
      </div>
    </div>
  );
};

export default User;
