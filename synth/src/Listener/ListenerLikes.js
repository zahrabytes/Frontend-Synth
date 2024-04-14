import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import '../index.css';

function ListenerLikes() {
  const { id } = useParams();
  const [artistResults, setArtistResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);
  const [songResults, setSongResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = async () => {
        try {
          const artist = await axios.get(`http://localhost:8800/${id}/followed-artists`); 
          setArtistResults(artist.data);
    
          const album = await axios.get(`http://localhost:8800/${id}/albums-liked`);
          setAlbumResults(album.data);
    
          const song = await axios.get(`http://localhost:8800/${id}/songs-liked`);
          setSongResults(song.data);
        } catch (error) {
          console.error('Error searching:', error);
        }
      };   
      loadPage(); 
    }, [id]);

  const handleAlbumSelect = (album) => {
    navigate(`/View-Album/${id}/${album}`);
  };

  const handleArtistSelect = (artist) => {
    navigate(`/View-Artist/${id}/${artist}`)
  };

  return (
    <div>
        <div className='flex-container'>
        <div className='left-align-container'>
          <subheader>Artist</subheader>
          <div className='scrollbar'>
            {artistResults.map((item, index) => (
              <li key={index} className="album-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img div onClick={() => handleArtistSelect(item.artistID)} className='img-pfp-display-after' src={item.profilePic} alt={item.artistPic} />
                  {item.artistName}</div>
              </li>
            ))}
          </div>
        </div>
        <div className='right-align-container'>
          <subheader>Song</subheader>
          <ul>
            {songResults.map((item, index) => (
              <li key={index}>
                {item.songTitle}
                <audio controls src={item.filePath}></audio>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <subheader>Album</subheader>
      <div className="album-container">
    {albumResults.map((item, index) => (
        <div key={index} className="album-item">
            <div onClick={() => handleAlbumSelect(item.albumID)}>
                <img className='img-display-after' src={item.cover} alt={item.cover} />
            </div>
            <div onClick={() => handleAlbumSelect(item.albumID)}>
                {item.albumName}
            </div>
        </div>
    ))}
    </div>
    </div>
  );
};

export { ListenerLikes };