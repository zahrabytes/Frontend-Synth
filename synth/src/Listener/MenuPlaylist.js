// MenuPlayList.js
/*import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsMusicNoteList, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { PlayList } from "./Playlist";

function MenuPlayList({ selectedSong }) {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    // Fetch playlists from the backend when the component mounts
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get("/playlists");
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName) return;

    try {
      const response = await axios.post("/create-playlist", {
        name: newPlaylistName,
        songs: [],
      });
      const newPlaylist = response.data;
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName(""); // Clear input field after creating playlist
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleAddSong = async (playlistId) => {
    try {
      await axios.post(`/playlist/${playlistId}/add-song`, {
        song: selectedSong, // Use the selected song
      });
      // Refresh the playlists after adding the song
      const response = await axios.get("/playlists");
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  const handleChange = (event) => {
    setNewPlaylistName(event.target.value);
  };

  return (
    <div className="playListContainer">
      <div className="nameContainer">
        <p>Playlists</p>
        <i>
          <FaPlus onClick={handleCreatePlaylist} />
        </i>
      </div>

      {/* Input field to enter playlist name }
      <input
        type="text"
        value={newPlaylistName}
        onChange={handleChange}
        placeholder="Enter playlist name"
      />

      <div className="playListScroll">
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <Playlist playlist={playlist} />
            <button onClick={() => handleAddSong(playlist.id)}>
              Add Song
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}*/

// MenuPlaylist.js

import React from "react";
import { BsMusicNoteList, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { PlayList } from "./Playlist";

function MenuPlayList({ onSelectPlaylist }) {
  const handlePlaylistClick = (playlistId) => {
    onSelectPlaylist(playlistId);
  };

  return (
    <div className="playListContainer">
      <div className="nameContainer">
        <p>Playlists</p>
        <i>
          <FaPlus />
        </i>
      </div>

      <div className="playListScroll">
        {PlayList &&
          PlayList.map((list) => (
            <div
              className="playLists"
              key={list.id}
              onClick={() => handlePlaylistClick(list.id)} // Handle click on playlist
            >
              <i className="list">
                <BsMusicNoteList />
              </i>
              <p>{list.name}</p>
              <i className="trash">
                <BsTrash />
              </i>
            </div>
          ))}
      </div>
    </div>
  );
}

export { MenuPlayList };


