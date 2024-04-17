import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import { formatDate } from '../DateFormat.js';

function ArtistHome() {
    const { artistID } = useParams();
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
    
    const handleDelete = async (id)=>{
        try{
            await axios.delete(`http://localhost:8800/${id}/albums`)
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    const handleAlbumSelect = (albumID) => {
        navigate(`/${artistID}/albums/${albumID}/songs`);
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

            {albumResults.map((album) => (
                    <div  key={album.albumID}>
                        <div onClick={() => handleAlbumSelect(album.albumID)}>
                        <img className='album-cover' src={album.cover} alt="" />
                        </div>
                        <h2 onClick={() => handleAlbumSelect(album.albumID)}>{album.albumName}</h2>
                        <button onClick={ () => navigate(`/${artistID}/upload/${album.albumID}`)}>
                            Upload Songs
                        </button>
                        <button onClick={ () => navigate(`/${artistID}/update/${album.albumID}`)}>
                            Update
                        </button>
                        <button onClick={() => handleDelete(album.albumID)}>Delete</button>
                        <button onClick={ () => navigate(`/${artistID}/albums/${album.albumID}/songs`)}>
                            View Songs
                        </button>
                    </div>
                ))}
            <button onClick={ () => navigate(`/${artistID}/albums/add`)}>
                Add new album
            </button>
        </div>
    );
  }
  
  export default ArtistHome;
  