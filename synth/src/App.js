import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';

// Import your components
import { AdminHome } from './Admin/AdminHome.js';
import AlbumAdd from './Artist/AlbumAdd.jsx';
import AlbumUpdate from './Artist/AlbumUpdate.jsx';
import Albums from './Artist/Albums.jsx';
import ArtistReport from './Artist/ArtistReport.jsx';
import SongAdd from './Artist/SongAdd.jsx';
import SongsView from './Artist/ViewAlbumArtist.jsx';
import Disclaimer from './Disclaimer.js';
import Landing from './Landing.js';
import { ListenerHome } from './Listener/ListenerHome.js';
import { SearchPage } from './Listener/SearchPage.js';
import ViewAlbum from "./Listener/ViewAlbum.js";
import CreateAccount from './Pages/createAccount.jsx';
import CreateAccountArtist from './Pages/createAccountArtist.jsx';
import CreateAccountListener from './Pages/createAccountListener.jsx';
import LoginAdmin from './Pages/login-admin.jsx';
import LoginArtist from './Pages/login-artist.jsx';
import ListenerLogin from './Pages/login-listener.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Landing />} />]
            <Route path="/Create-Album" element={<AlbumAdd />} />
            <Route path="/:id/user-home" element={<ListenerHome />} />
            <Route path="/:id/Admin-Home" element={<AdminHome />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/:id/albums/add" element={<AlbumAdd />} />
            <Route path="/:id/albums" element={<Albums />} />
            <Route path="/:artistID/update/:id" element={<AlbumUpdate />} />
            <Route path="/:artistID/upload/:id" element={<SongAdd />} />
            <Route path="/Registration" element={<CreateAccount />} />
            <Route path="onClick={handleSearchClick}" element={<CreateAccount />} />
            <Route path="/registration/ListenerRegistration" element={<CreateAccountListener />} />
            <Route path="/registration/artistRegistration" element={<CreateAccountArtist />} />
            <Route path="/login-listener" element={<ListenerLogin />} />
            <Route path="/login-artist" element={<LoginArtist />} />
            <Route path="/Disclaimer" element={<Disclaimer />} />
            <Route path="/Search/:id" element={<SearchPage />} />
            <Route path="/View-Album/:id/:albumID" element={<ViewAlbum />} />
            <Route path =":artistID/albums/:albumID/songs" element ={<SongsView />} />
            <Route path="/:artistID/reports" element ={<ArtistReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;