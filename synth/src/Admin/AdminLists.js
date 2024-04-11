import axios from 'axios';
import React from 'react';

function AdminLists({ notifications }) {
    // Function to handle deleting a song
    const handleDeleteSong = async (songID) => {
        try {
            // Send HTTP POST request to delete the song
            await axios.post(`/admin/${songID}/delete-song`);
            // Handle success
            console.log('Song deleted successfully');
            // You may want to update the state or fetch notifications again after deletion
        } catch (error) {
            // Handle error
            console.error('Error deleting song:', error);
        }
    };

    return (
        <div className="adminlists">
            <h2 className="title">
                Reports <span></span>
            </h2>
            <div className= "reportsContainer">
                <div className="reports">
                    {/* Map over notifications and render each notification */}
                    {notifications.map(notification => (
                        <div className="report" key={notification.notificationID}>
                            <div className="imgBox">
                                <img src={notification.cover} alt={notification.songTitle} />
                            </div>
                            <div className="section">
                                <p className="albumName">
                                    {notification.songTitle} 
                                    <span className="spanArtist"> {notification.artistName}</span>
                                </p>
                                <div className="removereject">
                                    {/* Add event handler to trigger deletion */}
                                    <div className="RemoveContent" onClick={() => handleDeleteSong(notification.songID)}>
                                        Remove Content
                                    </div>
                                    <div className="RejectReport">
                                        Reject Report
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { AdminLists };


/*
import React from 'react';

function AdminLists({ notifications }) {
    return (
        <div className="adminlists">
            <h2 className="title">
                Reports <span>{notifications.length} reports</span>
            </h2>
            <div className="reportsContainer">
                {notifications.map(notification => (
                    <div key={notification.id} className="reports">
                        <div className="report">
                            <div className="imgBox">
                                <img src={notification.albumPhoto} alt="Album Cover"/>
                            </div>
                            <div className="section">
                                <p className="albumName">
                                    {notification.songName}
                                    <span className="spanArtist"> {notification.artistName}</span>
                                </p>
                                <div className="removereject">
                                    <div className="RemoveContent" onClick={() => handleRemoveContent(notification.id)}>
                                        Remove Content
                                    </div>
                                    <div className="RejectReport" onClick={() => handleRejectReport(notification.id)}>
                                        Reject Report
                                      </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { AdminLists };*/