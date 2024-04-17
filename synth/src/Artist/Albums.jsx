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
                    <div  key={album.albumID}>
                        <div onClick={() => handleAlbumSelect(album.albumID)}>
                        <img className='album-cover' src={album.cover} alt="" />
                        </div>
                        <h2 onClick={() => handleAlbumSelect(album.albumID)}>{album.albumName}</h2>
                        <button className='upload'>
                            <Link to={`/${id}/upload/${album.albumID}`}>Upload Songs</Link>
                        </button>
                        <button className='update'>
                            <Link to={`/${id}/update/${album.albumID}`}>Update</Link>
                        </button>
                        <button className='delete' onClick={() => handleDelete(album.albumID)}>Delete</button>
                        <button className='view-songs'>
                            <Link to={`/${id}/albums/${album.albumID}/songs`}>View Songs</Link>
                        </button>
                    </div>
                ))}
            </div>
            <button className='submit add-album'>
                <Link to={`/${id}/albums/add`}>Add new album</Link>
            </button>
            <button>
                <Link to={`/${id}/reports`}>Run Report</Link>
            </button>
            <button className="roundedButton">
                <Link to="/">Logout</Link>
            </button>
        </div>
    );
};

export default Albums;