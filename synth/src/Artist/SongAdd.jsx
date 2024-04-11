import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SongAdd = () => {
  const [songs, setSongs] = useState([
    {
      songTitle: '',
      filePath: '',
      songDuration: ''
    }
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const artistID = location.pathname.split('/')[1];
  const id = location.pathname.split('/')[3];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newSongs = [...songs];
    newSongs[index] = { ...newSongs[index], [name]: value };
    setSongs(newSongs);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        songs.map(async (song) => {
          await axios.post(`http://localhost:8800/albums/`+id+`/upload`, song);
        })
      );
      navigate("/"+artistID+"/albums");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddSong = () => {
    setSongs([...songs, { songTitle: '', filePath: '', songDuration: '' }]);
  };

  const handleRemoveSong = (index) => {
    const newSongs = [...songs];
    newSongs.splice(index, 1);
    setSongs(newSongs);
  };

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchCurrentAlbum = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/albums/${id}/upload`);
        setAlbum(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentAlbum();
  }, [id]);

  return (
    <div>
      {album && (
        <div className="album" key={album.albumID}>
          {album.cover && <img src={album.cover} alt="" />}
          <h2>{album.albumName}</h2>
        </div>
      )}
      <div className="form">
        <h1>Add song</h1>
        {songs.map((song, index) => (
          <div key={index} className="song-row">
            <span>{index + 1}</span>
            <input type="text" placeholder="song title" onChange={(e) => handleChange(index, e)} name="songTitle" value={song.songTitle} />
            <input type="text" placeholder="song url" onChange={(e) => handleChange(index, e)} name="filePath" value={song.filePath} />
            <input type="text" placeholder="song duration" onChange={(e) => handleChange(index, e)} name="songDuration" value={song.songDuration}/>
            <button className="remove-button" onClick={() => handleRemoveSong(index)}>Remove</button>
          </div>
        ))}
        <button className="formButton" onClick={handleAddSong}>Add Song</button>
        <button className="formButton" onClick={handleClick}>Add All Songs</button>
      </div>
    </div>
  );
};

export default SongAdd