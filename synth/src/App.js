import './index.css';
import Home from './Home.js';
import LoginSignup from './LoginSignup.jsx';
import ArtistProfile from './ArtistProfile.js';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlbumAdd from './AlbumAdd.js';

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
            <Route path="/Artist">
              <ArtistProfile />
            </Route>
            <Route path ="/Create-Album">
              <AlbumAdd />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
