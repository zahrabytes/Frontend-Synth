import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { useParams } from 'react-router-dom';
import '../index.css';

function ViewAlbum() {
    const { id, albumID} = useParams();
    const [albumResults, setAlbumResults] = useState([]);
    const [songResults, setSongResults] = useState([]);
    const [likedSongs, setLikedSongs] = useState(new Set());
    const [albumLike, setAlbumLike] = useState(false);

    
    const findLikedSongs = async () => {
        try {
            const songsP = await axios.get(`http://localhost:8800/${id}/${albumID}/songs-liked`);
            const songsLikedData = songsP.data;
            const transformedSongs = songsLikedData.map((song, index) => {
                return { ...song, index: index + 1 };
            });
            setLikedSongs(new Set(transformedSongs));
            console.log('Songs found');
            console.log(likedSongs);
        } catch (error) {
            console.error('Error finding songs:', error);
        }
    };

    const fetchAlbum = async () => {
        try {
            const album = await axios.get(`http://localhost:8800/view-album/${albumID}`); 
            setAlbumResults(album.data);
            const song = await axios.get(`http://localhost:8800/view-album/${albumID}/song/`); 
            setSongResults(song.data);
            console.log('Songs found');
            console.log(likedSongs);
        } catch (error) {
        console.error('Error searching:', error);
        }
    }; 

    useEffect(() => {
        fetchAlbum();
        if (likedSongs.length !== 0) {
        return; 
        } 
        findLikedSongs();
    }, [id, albumID]);

    const handleLikeAlbum= async () => {
        try {
            await axios.post(`http://localhost:8800/${id}/${albumID}/like-album`);
            setAlbumLike(true);
            console.log('Album liked:', albumID);
        } catch (error) {
            console.error('Error liking album:', error);
        }
    };
  
    const handleUnlikeAlbum = async () => {
        try {
            await axios.delete(`http://localhost:8800/${id}/${albumID}/unlike-album`);
            setAlbumLike(false);
            console.log('Album unliked:', albumID);
        } catch (error) {
            console.error('Error unliking song:', error);
        }
    };

    const handleLikeSong = async (songID) => {
        try {
            await axios.post(`http://localhost:8800/${id}/${songID}/like-song`);
            setLikedSongs(new Set([...likedSongs, songID]));
        } catch (error) {
            console.error('Error liking song:', error);
        }
    };
  
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
                            <p>Release Date: {album.releaseDate}</p>
                            <p>Genre: {album.genre}</p>
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
                        <p>Song Duration: {song.songDuration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAlbum;