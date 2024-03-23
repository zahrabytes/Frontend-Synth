import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home.js';
import LoginSignup from './LoginSignup.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className = "content">
          <Switch>
            <Route exact path ="/">
              <Home />
            </Route>
            <Route path="/Login">
              <LoginSignup />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
