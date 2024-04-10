import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../index.css';
import { PiHeartLight } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";

const ViewAlbum = () => {
    const { listenerID, albumID} = useParams();
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);
    const [likedSongs, setLikedSongs] = useState(new Set());

    const handleLikeSong = async (songID) => {
        try {
            await axios.post(`http://localhost:8800/listener/${listenerID}/${songID}/like-song`);
            setLikedSongs(new Set([...likedSongs, songID]));
        } catch (error) {
            console.error('Error liking song:', error);
        }
    };
  
    const handleUnlikeSong = async (songID) => {
        try {
            await axios.delete(`http://localhost:8800/listener/${listenerID}/${songID}/unlike-song`);
            const updatedLikedSongs = new Set(likedSongs);
            updatedLikedSongs.delete(songID);
            setLikedSongs(updatedLikedSongs);
        } catch (error) {
            console.error('Error unliking song:', error);
        }
    };


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
                        <button onClick={() => likedSongs.has(song.songID) ? handleUnlikeSong(song.songID) : handleLikeSong(song.songID)}>
                            {likedSongs.has(song.songID) ? <PiHeartFill /> : <PiHeartLight />}
                        </button>
                        <p>Song Duration: {song.songDuration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAlbum;