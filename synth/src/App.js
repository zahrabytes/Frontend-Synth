import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AdminHome } from './Admin/AdminHome.js';
import AlbumAdd from './AlbumAdd.js';
import ArtistProfile from './ArtistProfile.js';
import Home from './Home.js';
import { LeftMenu } from './Listener/LeftMenu.js';
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
            <Route path="/Artist">
              <ArtistProfile />
            </Route>
            <Route path ="/Create-Album">
              <AlbumAdd />
            </Route>
            <Route path ="/User-Home">
            <LeftMenu />
            </Route>
            <Route path ="/Admin-Home">
            <AdminHome />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;