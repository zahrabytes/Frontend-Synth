import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiFlagFill, PiHeartFill, PiHeartLight } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../DateFormat.js';
import '../index.css';
import { LeftMenu } from './LeftMenu.js';

function ViewAlbum() {
    const { id, albumID } = useParams();
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);
    const [albumLike, setAlbumLike] = useState(false);
    const [likedSongs, setLikedSongs] = useState(new Set());
    // const [flaggedSongs, setFlaggedSongs] = useState(new Set());
    const navigate = useNavigate();
    // Fetch only when albumID changes
    useEffect(() => {
        const fetchAlbum = async () => {

            try {
                // Fetch album details
                const album = await axios.get(`http://localhost:8000/view-album/${albumID}`);
                setAlbumResults(album.data);
            } catch (error) {
                // Handle album fetch error
                console.error('Error fetching album:', error);
            }

            try {
                // Fetch songs details
                const songs = await axios.get(`http://localhost:8000/view-album/${albumID}/song/`);
                setSongResults(songs.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchAlbum();

        // Fetch liked songs when component mounts
        findLikedSongs();

        // Fetch liked album when component mounts
        findLikedAlbum();

    }, [albumID]);

    const findLikedSongs = async () => {
        try {
            const songsP = await axios.get(`http://localhost:8000/${id}/${albumID}/songs-liked`);
            const songsLikedData = songsP.data;
            const likedSongIDs = songsLikedData.map(song => song.songID);
            setLikedSongs(new Set(likedSongIDs));
            console.log('Liked songs found');
        } catch (error) {
            console.error('Error finding liked songs:', error);
        }
    };

    const findLikedAlbum = async () => {
        try {
            const likedAlbum = await axios.get(`http://localhost:8000/${id}/albums-liked`);
            // If the liked album in the album_like table matches the albumID in the params, set the albumLike hook to true
            setAlbumLike(likedAlbum.data.some(album => album.albumID === parseInt(albumID)));
        } catch (error) {
            console.error('Error finding liked album', error);
        }
    };

    const handleFlag = async (songID, song) => {
        try {
            await axios.post(`http://localhost:8000/flag-song/${songID}`);
            // setFlaggedSongs(prevFlaggedSongs => new Set([...prevFlaggedSongs, songID]));
            console.log('Song Flagged');
            navigate(`/submit-report/${id}/${songID}`); 
        } catch (error) {
            console.error('Error Flagging Song', error);
        }
    };

    // Like album
    const handleLikeAlbum = async () => {
        try {
            await axios.post(`http://localhost:8000/${id}/${albumID}/like-album`);
            setAlbumLike(true);
            console.log('Album liked:', albumID);
        } catch (error) {
            console.error('Error liking album:', error);
        }
    };
  
    // Unlike album
    const handleUnlikeAlbum = async () => {
        try {
            await axios.delete(`http://localhost:8000/${id}/${albumID}/unlike-album`);
            setAlbumLike(false);
            console.log('Album unliked:', albumID);
        } catch (error) {
            console.error('Error unliking album:', error);
        }
    };

    // Like song
    const handleLikeSong = async (songID) => {
        try {
            await axios.post(`http://localhost:8000/${id}/${songID}/like-song`);
            setLikedSongs(prevLikedSongs => new Set([...prevLikedSongs, songID]));
        } catch (error) {
            console.error('Error liking song:', error);
        }
    };
  
    // Unlike song
    const handleUnlikeSong = async (songID) => {
        try {
            await axios.delete(`http://localhost:8000/${id}/${songID}/unlike-song`);
            const updatedLikedSongs = new Set(likedSongs);
            updatedLikedSongs.delete(songID);
            setLikedSongs(updatedLikedSongs);
        } catch (error) {
            console.error('Error unliking song:', error);
        }
    };

    return (
        <div className="listener-container">
            <LeftMenu />
        <div className="container-album">
            {albumResults.map((album, index) => (
                <div key={index} className="album-info">
                    <img className="album-cover" src={album.cover} alt={album.cover} />
                    <div className="album-details">
                        <h1>{album.albumName}</h1>
                        <p>{formatDate(album.releaseDate)}</p>
                        <p>{album.genre}</p>
                    </div>
                    <div className="like-button" onClick={() => albumLike ? handleUnlikeAlbum() : handleLikeAlbum()}>
                        {albumLike ? <PiHeartFill /> : <PiHeartLight />}
                    </div>
                </div>
            ))}

            <ul className="song-list">
                {songResults.map((song, index) => (
                    <li key={index} className="song-item">
                        <audio controls src={song.filePath}></audio>
                        <h2>{song.songTitle}</h2>
                        <div className="song-actions">
                            <div onClick={() => likedSongs.has(song.songID) ? handleUnlikeSong(song.songID) : handleLikeSong(song.songID)}>
                                {likedSongs.has(song.songID) ? <PiHeartFill /> : <PiHeartLight />}
                            </div>
                            <PiFlagFill onClick={() => handleFlag(song.songID)} />
                            {/* <div onClick={() => {
                                 if (!flaggedSongs.has(song.songID)) {
                                   handleFlag(song.songID);
                                }
                            }}>
                                {flaggedSongs.has(song.songID) ? <PiFlagFill /> : <PiFlag />} 
                            </div>*/}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default ViewAlbum;
