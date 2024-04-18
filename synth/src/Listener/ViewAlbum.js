import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight, PiFlag, PiFlagFill  } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import { formatDate } from '../DateFormat.js';
import '../index.css';
import '../modal/Modal.css'

function ViewAlbum() {
    const { id, albumID } = useParams();
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);
    const [albumLike, setAlbumLike] = useState(false);
    const [likedSongs, setLikedSongs] = useState(new Set());
    const [flaggedSongs, setFlaggedSongs] = useState(new Set());
    const [modal, setModal] = useState(false); //this is what you will use for the pop up

    const [modalStates, setModalStates] = useState({});

    
    // Fetch only when albumID changes
    useEffect(() => {
        const fetchAlbum = async () => {

            try {
                // Fetch album details
                const album = await axios.get(`http://localhost:8800/view-album/${albumID}`);
                setAlbumResults(album.data);
            } catch (error) {
                // Handle album fetch error
                console.error('Error fetching album:', error);
            }

            try {
                // Fetch songs details
                const songs = await axios.get(`http://localhost:8800/view-album/${albumID}/song/`);
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
            const songsP = await axios.get(`http://localhost:8800/${id}/${albumID}/songs-liked`);
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
            const likedAlbum = await axios.get(`http://localhost:8800/${id}/albums-liked`);
            // If the liked album in the album_like table matches the albumID in the params, set the albumLike hook to true
            setAlbumLike(likedAlbum.data.some(album => album.albumID === parseInt(albumID)));
        } catch (error) {
            console.error('Error finding liked album', error);
        }
    };

    const handleFlag = async (songID) => {
        try {
            await axios.post(`http://localhost:8800/flag-song/${songID}`);
            console.log('Song Flagged');
        } catch (error) {
            console.error('Error Flagging Song', error);
        }
    };

    const toggleModal = (songID) => {
        setModalStates(prevState => ({
            ...prevState,
            [songID]: !prevState[songID]
        }));
    };
    

    const closeModal = (songID) => {        
        handleFlag(songID);
        toggleModal(songID);
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

  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    return (
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
                            <div onClick={() => {
                                    if (!flaggedSongs.has(song.songID)) {
                                        toggleModal(song.songID);  
                                    }
                                }}>
                                {flaggedSongs.has(song.songID) ? <PiFlagFill /> : <PiFlag />}
                                {modalStates[song.songID] && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <h2>Hello Modal</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                                                perferendis suscipit officia recusandae, eveniet quaerat assumenda
                                                id fugit, dignissimos maxime non natus placeat illo iusto!
                                                Sapiente dolorum id maiores dolores? Illum pariatur possimus
                                                quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                                                placeat tempora vitae enim incidunt porro fuga ea.
                                            </p>
                                            <button onClick={() => closeModal(song.songID)}>
                                                CLOSE
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAlbum;
