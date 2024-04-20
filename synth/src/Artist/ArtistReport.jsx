import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ArtistReport = () => {
    const [mostLikedSongs, setMostLikedSongs] = useState([]);
    const location = useLocation();
    
    const artistId = location.pathname.split("/")[1];

    useEffect(() => {
        const fetchMostLikedSongs = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/${artistId}/reports`);
                setMostLikedSongs(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMostLikedSongs();
    }, [artistId]);

    const renderAlbumsWithSongs = () => {
        const albumsWithSongs = {};
        mostLikedSongs.forEach(song => {
            if (!albumsWithSongs[song.albumID]) {
                albumsWithSongs[song.albumID] = {
                    albumName: song.albumName,
                    cover: song.cover,
                    songs: [song]
                };
            } else {
                albumsWithSongs[song.albumID].songs.push(song);
            }
        });

        return Object.values(albumsWithSongs).map(album => (
            <div className="album" key={album.albumID}>
                {album.cover && <img className='img-display-after' src={album.cover} alt={`Cover for ${album.albumName}`} />}
                <h2>{album.albumName}</h2>
                {album.songs.map((song, index) => (
                    <div key={index}>
                        <p>Song: {song.songTitle}</p>
                        <p>Likes: {song.numLikes}</p>
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div>
            <h1>Artist Report</h1>
            <div className="albums">
                {renderAlbumsWithSongs()}
            </div>
        </div>
    );
};

export default ArtistReport;