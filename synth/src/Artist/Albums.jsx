import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../index.css';

const Albums = () => {
    const [albums, setAlbums] = useState([])
    const location = useLocation();
    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(()=>{
        const fetchAllAlbums = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/${id}/albums`)
                setAlbums(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllAlbums()
    }, [])

    const handleDelete = async (id)=>{
        try{
            await axios.delete(`http://localhost:8800/${id}/albums`)
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    const handleAlbumSelect = (albumID) => {
        navigate(`/${id}/albums/${albumID}/songs`);
      };

      return (
        <div>
          <h1 className='textwhite'>Library</h1>
          <div className="albums">
            {albums.map((album) => (
              <div key={album.albumID} className="album-container">
                <div className="album-info">
                  <div className="album-item" onClick={() => handleAlbumSelect(album.albumID)}>
                    {album.cover && <img className='img-display-after' src={album.cover} alt="" />}
                  </div>
                  <div>
                    <h2 onClick={() => handleAlbumSelect(album.albumID)}>{album.albumName}</h2>
                    <button className='button'>
                      <Link to={`/${id}/upload/${album.albumID}`} style={{ textDecoration: 'none', color: 'inherit' }}>Upload Songs</Link>
                    </button>
                    <button className='button'>
                      <Link to={`/${id}/update/${album.albumID}`} style={{ textDecoration: 'none', color: 'inherit' }}>Update</Link>
                    </button>
                    <button className='button' onClick={() => handleDelete(album.albumID)}>Delete</button>
                    <button className='button'>
                      <Link to={`/${id}/albums/${album.albumID}/songs`} style={{ textDecoration: 'none', color: 'inherit' }}>View Songs</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <button className="logout-button">
                <Link to="/"style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link>
            </button>
        </div>
    );
};

export default Albums;