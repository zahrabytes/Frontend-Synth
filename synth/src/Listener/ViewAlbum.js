import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight, PiFlag, PiFlagFill  } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import { formatDate } from '../DateFormat.js';
import '../index.css';

function ViewAlbum() {
    const { id, albumID } = useParams();
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);
    const [albumLike, setAlbumLike] = useState(false);
    const [likedSongs, setLikedSongs] = useState(new Set());
    const [flaggedSongs, setFlaggedSongs] = useState(new Set());
    
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

        // Fetch liked songs when component mounts
        findLikedSongs();
    }, [albumID]);


    const findLikedSongs = async () => {
        try {
            const songsP = await axios.get(`http://localhost:8800/${id}/${albumID}/songs-liked`);
            const songsLikedData = songsP.data;
            const likedSongIDs = songsLikedData.map(song => song.songID);
            setLikedSongs(new Set(likedSongIDs));
            console.log('Liked songs found');
        } catch (error) {
            console.error('Error finding liked songs:', error);
        }
    };

    const handleFlag = async (songID) => {
        try {
            await axios.post(`http://localhost:8800/flag-song/${songID}`);
            setFlaggedSongs(prevFlaggedSongs => new Set([...prevFlaggedSongs, songID]));
            console.log('Song Flagged');
        } catch (error) {
            console.error('Error Flagging Song', error);
        }
    };

    // Like album
    const handleLikeAlbum = async () => {
        try {
            await axios.post(`http://localhost:8800/${id}/${albumID}/like-album`);
            setAlbumLike(true);
            console.log('Album liked:', albumID);
        } catch (error) {
            console.error('Error liking album:', error);
        }
    };
  
    // Unlike album
    const handleUnlikeAlbum = async () => {
        try {
            await axios.delete(`http://localhost:8800/${id}/${albumID}/unlike-album`);
            setAlbumLike(false);
            console.log('Album unliked:', albumID);
        } catch (error) {
            console.error('Error unliking album:', error);
        }
    };

    // Like song
    const handleLikeSong = async (songID) => {
        try {
            await axios.post(`http://localhost:8800/${id}/${songID}/like-song`);
            setLikedSongs(prevLikedSongs => new Set([...prevLikedSongs, songID]));
        } catch (error) {
            console.error('Error liking song:', error);
        }
    };
  
    // Unlike song
    const handleUnlikeSong = async (songID) => {
        try {
            await axios.delete(`http://localhost:8800/${id}/${songID}/unlike-song`);
            const updatedLikedSongs = new Set(likedSongs);
            updatedLikedSongs.delete(songID);
            setLikedSongs(updatedLikedSongs);
        } catch (error) {
            console.error('Error unliking song:', error);
        }
    };

    return (
        <div>
            <ul>
                {albumResults.map((album, index) => (
                    <li key={index}>
                        <div><img className='img-display-after' src={album.cover} alt={album.cover} /></div>
                        <div>
                            <h1>{album.albumName}</h1>
                            <p>{formatDate(album.releaseDate)}</p>
                            <p>{album.genre}</p>
                        </div>
                        <div onClick={() => albumLike ? handleUnlikeAlbum() : handleLikeAlbum()}>
                            {albumLike ? <PiHeartFill /> : <PiHeartLight />}
                        </div>
                    </li>
                ))}
            </ul>

            <ul>
                {songResults.map((song, index) => (
                    <li key={index}>
                        <h2>{song.songTitle}</h2>
                        <audio controls src={song.filePath}></audio>
                        <div onClick={() => likedSongs.has(song.songID) ? handleUnlikeSong(song.songID) : handleLikeSong(song.songID)}>
                            {likedSongs.has(song.songID) ? <PiHeartFill /> : <PiHeartLight />}
                        </div>
                        <div onClick={() => {
                            if (!flaggedSongs.has(song.songID)) {
                                handleFlag(song.songID);
                            }
                            }}>
                            {flaggedSongs.has(song.songID) ? <PiFlagFill /> : <PiFlag/>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAlbum;
