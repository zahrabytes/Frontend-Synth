import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AdminHome } from './Admin/AdminHome.js';
import AlbumAdd from './AlbumAdd.js';
import ArtistProfile from './ArtistProfile.js';
import './index.css';
import Home from './Home.js';
import { ListenerHome } from './Listener/ListenerHome.js';
import LoginSignup from './LoginSignup.jsx';
import Disclaimer from './Disclaimer.js'; 
import { SearchPage } from './Listener/SearchPage.js';
import AudioPlayer from './Listener/audioplayer.js';

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
            <ListenerHome />
            </Route>
            <Route path ="/Admin-Home">
            <AdminHome />
            </Route>
            <Route path ="/audioplayer">
              <AudioPlayer />
            </Route>
            <Route path ="/Disclaimer">
              <Disclaimer />
            </Route>
            <Route path ="/Search">
              <SearchPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;