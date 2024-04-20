import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';


function ListenerLikes() {
  const { id } = useParams();
  const [artistResults, setArtistResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);
  const [songResults, setSongResults] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = async () => {
        try {
          const artist = await axios.get(`http://localhost:8000/${id}/followed-artists`); 
          setArtistResults(artist.data);
    
          const album = await axios.get(`http://localhost:8000/${id}/albums-liked`);
          setAlbumResults(album.data);
    
          const song = await axios.get(`http://localhost:8000/${id}/songs-liked`);
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
/*
  const handleSongPlay = async (songID) => {
    setShowPlayer(!showPlayer)
    try {
      await axios.post(`http://localhost:8000/${songID}/stream-song`, { songID });
      console.log('Song play request successful');
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };*/
  
  return (
    <div>
        <div className='flex-container'>
        <div className='left-align-container'>
          <subheader>Liked Artists</subheader>
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
          <subheader>Liked Songs</subheader>
          <ul className="song-scrollbar">
            {songResults.map((item, index) => (
              <li key={index} className="song-item">
                  <img className='img-song-display-after' src={item.cover} alt={item.cover} />
                  <audio controls src={item.filePath}></audio>
                  <songDisplay>{item.songTitle}</songDisplay>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='bottom-align-container'>
      <subheader>Liked Albums</subheader>
        <div className="scrollbar-album">
          {albumResults.map((item, index) => (
            <div key={index}>
            <div onClick={() => handleAlbumSelect(item.albumID)}>
                <img className='img-display-after' src={item.cover} alt={item.cover} />
            </div>
            <div onClick={() => handleAlbumSelect(item.albumID)}>
                {item.albumName}
            </div>
            </div>
          ))}</div>
        </div>
    </div>
  );
};

export { ListenerLikes };

