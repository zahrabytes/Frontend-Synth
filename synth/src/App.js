import './index.css';
import Home from './Home.js';
import LoginSignup from './LoginSignup.jsx';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
