import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css';

const ViewAlbum = () => {
    const { albumID } = useParams();
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const album = await axios.get(`http://localhost:8800/view-album/${albumID}`); 
                setAlbumResults(album.data);
                const song = await axios.get(`http://localhost:8800/view-album/${albumID}/song/`); 
                setSongResults(song.data);
            } catch (error) {
            console.error('Error searching:', error);
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
                        <div><h1>{album.albumName}</h1>
                        <p>Release Date: {album.releaseDate}</p>
                        <p>Genre: {album.genre}</p></div>
                        {/* Add other song details here */}
                    </li>
                ))}
            </ul>

            <ul>
                {songResults.map((song, index) => (
                    <li key={index}>
                        <h2>{song.songTitle}</h2>
                        <audio controls src={song.filePath}></audio>
                        <p>Song Duration: {song.songDuration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAlbum;