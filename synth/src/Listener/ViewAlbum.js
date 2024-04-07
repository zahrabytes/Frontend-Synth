import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AlbumPage({ match }) {
    const [albumData, setAlbumData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
}

export default AlbumPage;
