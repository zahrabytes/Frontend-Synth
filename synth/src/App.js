import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AdminHome } from './Admin/AdminHome.js';
import AlbumAdd from './AlbumAdd.js';
import ArtistProfile from './ArtistProfile.js';
import Disclaimer from './Disclaimer.js';
import { ListenerHome } from './Listener/ListenerHome.js';
import { SearchPage } from './Listener/SearchPage.js';
import ViewAlbum from "./Listener/ViewAlbum.js";
import AudioPlayer from './Listener/audioplayer.js';
import LoginOptions from './LoginOptions.js';
import LoginAdmin from './Pages/login-admin.jsx';
import ListenerLogin from './Pages/login-listener.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <LoginOptions />
              <Disclaimer />
            </Route>
            <Route path="/login">
              <LoginOptions />
            </Route>
            <Route path="/Artist">
              <ArtistProfile />
            </Route>
            <Route path="/Create-Album">
              <AlbumAdd />
            </Route>
            <Route path="/:id/user-home">
              <ListenerHome />
            </Route>
            <Route path="/:id/Admin-Home">
              <AdminHome />
            </Route>
            <Route path="/audioplayer">
              <AudioPlayer />
            </Route>
            <Route path="/Disclaimer">
              <Disclaimer />
            </Route>
            <Route path="/Search">
              <SearchPage />
            </Route>
            <Route path="/login-admin">
              <LoginAdmin />
            </Route>
            <Route path="/login-listener">
              <ListenerLogin />
            </Route>
            <Router>
              <Route path="/View-Album/:listenerID/:albumID" component={ViewAlbum} />
            </Router>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
