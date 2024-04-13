import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

function ViewAlbum() {
    const { artistID, albumID } = useParams();
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);
    
    // Fetch only when albumID changes
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                // Fetch album details
                const album = await axios.get(`http://localhost:8800/view-album/${albumID}`); 
                setAlbumResults(album.data);
                
                // Fetch song details
                const song = await axios.get(`http://localhost:8800/view-album/${albumID}/song/`); 
                setSongResults(song.data);
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        }; 
        fetchAlbum(); 

    }, [albumID]);

    return (
        <div>
            <ul>
                {albumResults.map((album, index) => (
                    <li key={index}>
                        <div><img className='img-display-after' src={album.cover} alt={album.cover} /></div>
                        <div>
                            <h1>{album.albumName}</h1>
                            <p>Release Date: {album.releaseDate}</p>
                            <p>Genre: {album.genre}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <ul>
                {songResults.map((song, index) => (
                    <li key={index}>
                        <h2>{song.songTitle}</h2>
                        <audio controls src={song.filePath}></audio>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAlbum;
