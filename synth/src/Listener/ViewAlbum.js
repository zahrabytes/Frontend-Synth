import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const AlbumWithSongs = ({ albumData }) => {
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);

    const fetchAlbum = async () => {
        try {
            const album = await axios.get(`http://localhost:8800/search-artist?searchTerm=${searchTerm}`);
            setAlbumResults(album.data);
        } catch (error) {
          console.error('Error searching:', error);
        }
      };  
    
    return (
        <div>
        </div>
    );
};

export default ViewAlbum;