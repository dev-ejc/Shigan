import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import About from "./components/pages/About";
import User from "./components/pages/User";
// import Stock from './components/pages/Stock'
import Portfolio from "./components/pages/Portfolio";
// import News from './components/pages/News'
import NotFound from "./components/pages/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layouts/Alert";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              {/* <PrivateRoute exact path="/Stock/:id" component={Stock} />
                  <PrivateRoute exact path="/News" component={News} /> */}
              {/* <PrivateRoute exact path="/Research" component={Research} /> */}
              <PrivateRoute exact path="/" component={User} />
              <PrivateRoute exact path="/Portfolio" component={Portfolio} />
              <Route exact path="/About" component={About} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
