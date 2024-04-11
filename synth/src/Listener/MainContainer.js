import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './MainContainer.css';

function MainContainer() {
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState([]);

    useEffect(() => {
        const allLi = document
            .querySelector(".menuList")
            .querySelectorAll("li");

        function changeMenuActive() {
            allLi.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
            const playlistId = this.getAttribute("data-playlist-id");
            setSelectedPlaylist(playlistId); 
            fetchSongsForPlaylist(playlistId);
        }

        allLi.forEach((n) => n.addEventListener("click", changeMenuActive));

        return () => {
            allLi.forEach((n) => n.removeEventListener("click", changeMenuActive));
        };
    }, []);

    const fetchSongsForPlaylist = async (playlistId) => {
        try {
            const response = await axios.get(`/playlist/${playlistId}/songs`);
            setPlaylistSongs(response.data); 
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    return (
        <div className='mainContainer'>
            <div className="menuList">
                <ul>
                    <li data-playlist-id="1"><a href="#">Playlist 1</a></li>
                    <li data-playlist-id="2"><a href="#">Playlist 2</a></li>
                    <li data-playlist-id="3"><a href="#">Playlist 3</a></li>
                    {/* Add more playlist items as needed */}
                    <li>
                        <Link to="/" className="roundedButton">Home</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h2>Songs for Selected Playlist</h2>
                <ul>
                    {playlistSongs.map((song, index) => (
                        <li key={index}>{song.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export { MainContainer };
