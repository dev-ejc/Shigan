import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StockState from './context/stocks/StockState'
import AlertState from './context/alerts/AlertState'
import About from './pages/About'
import Home from './pages/Home'
import StockPage from './pages/StockPage'
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar'
import Alert from './components/alerts/Alert'
import './App.css';

function App() {
  return (
    <StockState>
      <AlertState>
        <Router>
          <div className="App">
          <Navbar/>
            <div className="container">
              <Alert/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/About" component={About}/>
                <Route exact path="/stock/:symbol" component={StockPage}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </StockState>
  );
}

export default App;
