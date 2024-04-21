import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { PiTrash } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import { formatDate } from "../DateFormat.js";
import { SongContext } from '../context/SongContext';

import '../index.css';
import { ArtistLeft } from './LeftMenu.js';

function ViewAlbumArtist() {
    const { artistID, albumID } = useParams();
    const { songs, dispatch } = useContext(SongContext);
    const [albumResults, setAlbumResults] = useState([]);

    // Fetch only when albumID changes
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                // Fetch album details
                const album = await axios.get(`https://frontend-synth-3tzp.onrender.com/view-album/${albumID}`);
                setAlbumResults(album.data);

                // Fetch song details
                const songs = await axios.get(`https://frontend-synth-3tzp.onrender.com/view-album/${albumID}/song/`);
                dispatch({ type: 'SET_SONGS', payload: songs.data });
            } catch (error) {
                console.error('Error fetching album:', error);
            }
        };
        fetchAlbum();

    }, [albumID, dispatch]);

    // Delete song
    const handleDeleteSong = async (songID) => {
        try {
            await axios.delete(`https://frontend-synth-3tzp.onrender.com/admin/${songID}/delete-song`)
            dispatch({ type: 'DELETE_SONG', payload: { _id: songID } });
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <div className="listener-container">
            <ArtistLeft />
        <div className="container-album-new">
            <ul>
                {albumResults.map((album, index) => (
                    
                    <li key={index}>
                        <div><img className="album-cover" src={album.cover} alt={album.cover} /></div>
                        <div>
                            <h1>{album.albumName}</h1>
                            <p>{formatDate(album.releaseDate)}</p>
                            <p>{album.genre}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <ul className='plain-scrollbar-new'>
                {songs && songs.map((song, index) => (
                    <li key={index} className="song-item">
                        <audio controls src={song.filePath}></audio>
                        <h2>{song.songTitle}</h2>
                        <div onClick={() => handleDeleteSong(song.songID)}>
                            <PiTrash />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default ViewAlbumArtist;