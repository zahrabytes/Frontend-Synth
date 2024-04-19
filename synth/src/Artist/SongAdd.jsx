import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtistLeft } from './LeftMenu';

const SongAdd = () => {

  // Get the params from the URL
  const { artistID, id } = useParams();
  // To grab the data when fetching the album
  const [album, setAlbum] = useState(null);

  // Used to set all the variables we are going to pass to the post operation
  const [songTitle, setTitle] = useState('')
  const [songDuration, setDuration] = useState('')
  const [songFile, setFile] = useState(null)

  // To set and pending message when uploading a song
  const [isPending, setIsPending] = useState(false)

  // To set error messages and display them when posting fails
  const [error, setError] = useState(null)

  // Used for navigating the user after the post operation is successfull
  const navigate = useNavigate();

  useEffect(() => {

    const fetchAlbum = async () => {
      try {
        const album = await axios.get(`http://localhost:8800/albums/${id}/upload`);
        setAlbum(album.data);
      } catch (error) {
        console.log('There was an error fetching the album:', error);
      }
    };
    // Call the fetchAlbum function to fetch the album when the component renders
    fetchAlbum();
  }, [id]);

  const handleSongUpload = async (e) => {
    // If the operation is not successfull dont clear the input out of the form
    e.preventDefault();
    setIsPending(true)

    // We need to create a FormData object when passing data to multer
    const formData = new FormData();
    formData.append('songTitle', songTitle);
    formData.append('songDuration', songDuration);
    formData.append('song', songFile);

    try {
      await axios.post(`http://localhost:8800/albums/${id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsPending(false)
      setTitle('')
      setDuration('')
      setError(null)
      // after the operation navigate to this url
      navigate(`/${artistID}/albums`);
    } catch (err) {
      setIsPending(false)
      setError(error)
      console.log('Error posting the song to the db:', err);
    };

  }
  return (
    <div className="adminContainer">
            <ArtistLeft />
    <div className="container-album">
      {album && (
        <div>
          <div className="album-add-songs" key={album.albumID}>
            {album.cover && <img className='img-display-after' src={album.cover} alt="" />}
          </div>
          <div className="album-add-songs"> 
            <h2>{album.albumName}</h2>
          </div>
        </div>
      )}
      <div className="form">
        <h1>Add song</h1>
        <form onSubmit={handleSongUpload}>
          <div className="song-row">
            <input type="text" placeholder="Song Title" value={songTitle} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Song Duration" value={songDuration} onChange={(e) => setDuration(e.target.value)} />
            <input type="file" name="song" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          {!isPending && <button className="formButton">Add Song</button>}
          {isPending && <button className="formButton" disable>Adding song...</button>}
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
    </div>
  );
};

export default SongAdd;