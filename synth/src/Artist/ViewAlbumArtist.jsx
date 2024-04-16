import axios from 'axios';
import { PiTrash } from "react-icons/pi";
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SongContext } from '../context/SongContext';
import { formatDate } from "../DateFormat.js";

import '../index.css';

function ViewAlbum() {
    const { artistID, albumID } = useParams();
    const { songs, dispatch } = useContext(SongContext);
    const [albumResults, setAlbumResults] = useState([]);

    // Fetch only when albumID changes
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                // Fetch album details
                const album = await axios.get(`http://localhost:8800/view-album/${albumID}`);
                setAlbumResults(album.data);

                // Fetch song details
                const songs = await axios.get(`http://localhost:8800/view-album/${albumID}/song/`);
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
            await axios.delete(`http://localhost:8800/admin/${songID}/delete-song`)
            dispatch({ type: 'DELETE_SONG', payload: { _id: songID } });
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <div className="container-album">
            <ul>
                {albumResults.map((album, index) => (
                    
                    <li key={index} className="album-info">
                        <div><img className="album-cover" src={album.cover} alt={album.cover} /></div>
                        <div>
                            <h1>{album.albumName}</h1>
                            <p>{formatDate(album.releaseDate)}</p>
                            <p>{album.genre}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <ul>
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
    );
};

export default ViewAlbum;