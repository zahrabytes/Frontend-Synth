import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AdminHome } from './Admin/AdminHome.js';
import AlbumAdd from './AlbumAdd.js';
import AlbumUpdate from './Artist/AlbumUpdate.jsx';
import SongAdd from './Artist/SongAdd.jsx';
import ArtistProfile from './ArtistProfile.js';
import Disclaimer from './Disclaimer.js';
import { ListenerHome } from './Listener/ListenerHome.js';
import { SearchPage } from './Listener/SearchPage.js';
import ViewAlbum from "./Listener/ViewAlbum.js";
import AudioPlayer from './Listener/audioplayer.js';
import LoginOptions from './LoginOptions.js';
import CreateAccount from './Pages/createAccount.jsx';
import CreateAccountArtist from './Pages/createAccountArtist.jsx';
import CreateAccountListener from './Pages/createAccountListener.jsx';
import LoginAdmin from './Pages/login-admin.jsx';
import LoginArtist from './Pages/login-artist.jsx';
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
            <Route path="/:id/albums/add">
              <AlbumAdd />
            </Route>
            <Route path="/:id/albums/add">
              <AlbumAdd />
            </Route>
            <Route path="/:artistID/update/:id">
              <AlbumUpdate/>
            </Route>
            <Route path="/:artistID/upload/:id">
              <SongAdd/>
            </Route>
            <Route path="/Registration">
              <CreateAccount/>
            </Route>
            <Route path="/ListenerRegistration">
              <CreateAccountListener/>
            </Route>
            <Route path="/ArtistRegistration">
              <CreateAccountArtist/>
            </Route>
            <Route path="/login-artist">
              <LoginArtist/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
