// SearchPage.js

import axios from 'axios';
import React, { useState } from 'react';
import '../index.css';

function SearchPage({ onSongSelect }) { // Accepting onSongSelect as a prop
  const [searchTerm, setSearchTerm] = useState('');
  const [artistResults, setArtistResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);
  const [songResults, setSongResults] = useState([]);

  const handleSearch = async () => {
    try {
      const artist = await axios.get(`http://localhost:8800/search-artist?searchTerm=${searchTerm}`);
      setArtistResults(artist.data);

      const album = await axios.get(`http://localhost:8800/search-album?searchTerm=${searchTerm}`);
      setAlbumResults(album.data);

      const song = await axios.get(`http://localhost:8800/search-song?searchTerm=${searchTerm}`);
      setSongResults(song.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };  

  const handleSongSelect = (song) => {
    onSongSelect(song); // Pass selected song to the parent component
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Enter search term" 
      />
      <button onClick={handleSearch}>Search</button>
      <div className='flex-container'>
        <div className='left-align-container'>
          <subheader>Artist</subheader>
          <ul>
            {artistResults.map((item, index) => (
              <li key={index}>
                <div><img className='img-pfp-display-after' src={item.profilePic} alt={item.artistPic} /></div>
                <div>{item.artistName}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className='right-align-container'>
          <subheader>Song</subheader>
          <ul>
            {songResults.map((item, index) => (
              <li key={index} onClick={() => handleSongSelect(item)}>
                {item.songTitle}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <subheader>Album</subheader>
      <ul>
        {albumResults.map((item, index) => (
          <li key={index}>{item.albumName}</li>
        ))}
      </ul>
    </div>
  );
};

export { SearchPage };

