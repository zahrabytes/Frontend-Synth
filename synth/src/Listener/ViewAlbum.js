import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AlbumPage({ match }) {
    const [albumData, setAlbumData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]); // State to hold playlists

    useEffect(() => {
        const fetchAlbumAndSongs = async () => {
            try {
                const albumResponse = await axios.get(`/view-album/${match.params.albumID}`);
                setAlbumData(albumResponse.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAlbumAndSongs();
    }, [match.params.albumID]);

    const createPlaylist = async (playlistName) => {
        try {
            const newPlaylistResponse = await axios.post('/create-playlist', { name: playlistName });
            const newPlaylist = newPlaylistResponse.data;
            setPlaylists([...playlists, newPlaylist]); // Add new playlist to the existing playlists
            console.log('New playlist created:', newPlaylist);
            // Optionally, you can update your UI to reflect the new playlist
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    const handlePlaylistCreation = async () => {
        if (playlistName.trim() === '') {
            alert('Please enter a playlist name.');
            return;
        }
        createPlaylist(playlistName);
        setPlaylistName(''); // Clear the input field after creating playlist
    };

    return (
        <div>
            {/* Your album page content */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {albumData && (
                <div>
                    {/* Display album data */}
                    {/* For example: */}
                    <h1>{albumData.title}</h1>
                    <img src={albumData.cover} alt={albumData.title} />
                    {/* Other album details */}
                </div>
            )}

            {/* Playlist creation */}
            <input 
                type="text" 
                value={playlistName} 
                onChange={(e) => setPlaylistName(e.target.value)} 
                placeholder="Enter playlist name" 
            />
            <button onClick={handlePlaylistCreation}>Create Playlist</button>
        </div>
    );
}

export default AlbumPage;
