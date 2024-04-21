import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArtistLeft } from './LeftMenu';

const AlbumSongs = () => {
    const { albumID } = useParams();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await axios.get(`https://frontend-synth-3tzp.onrender.com/albums/${albumID}/songs`);
                setSongs(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchSongs();
    }, [albumID]);

    return (
        <div className="adminContainer">
            <ArtistLeft />
        <div className="content-container">
            <h1>Songs</h1>
            <div className="songs">
                {songs.map((song) => (
                    <div className="song" key={song.songID}>
                        <p>{song.songTitle}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default AlbumSongs;
