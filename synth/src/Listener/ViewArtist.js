import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight, PiFlag, PiFlagFill  } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import { formatDate } from '../DateFormat.js';

function ViewArtist() {
    const { id, artistID } = useParams();
    const [artistResult, setArtistResult] = useState([]);
    const [albumResults, setAlbumResults] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchArtistAlbums = async () => {
            try {
              const artist = await axios.get(`http://localhost:8800/view-artist/${artistID}/`);
              setArtistResult(artist.data);
        
              const album = await axios.get(`http://localhost:8800/view-albums/${artistID}/`);
              setAlbumResults(album.data);
            } catch (error) {
              console.error('Error searching:', error);
            }
          }; 
        fetchArtistAlbums(); 
    }, [artistID]);

    const handleAlbumSelect = (album) => {
        navigate(`/View-Album/${id}/${album}`);
    };

    return (
        <div>
            {artistResult.map((item, index) => (
              <div key={index}>
                <artistName>
                <img className='img-pfp-display-after' src={item.profilePic} alt={item.artistPic} />
                {item.artistName}</artistName>
              </div> 
            ))}
            <div class="rectangle-backdrop"></div>

            {albumResults.map((album, index) => (
                    <li key={index}>
                        <div onClick={() => handleAlbumSelect(album.albumID)}>
                            <img className='img-display-after' src={album.cover} alt={album.cover} />
                        </div>
                        <div>
                            <h1 onClick={() => handleAlbumSelect(album.albumID)}>{album.albumName}</h1>
                            <p>{formatDate(album.releaseDate)}</p>
                            <p>{album.genre}</p>
                        </div>
                    </li>
                ))}
        </div>
    );
  }
  
  export default ViewArtist;
  