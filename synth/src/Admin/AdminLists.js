/*import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

function AdminLists({ notification }) {
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

    // Function to handle rejecting a report
    const handleRejectReport = async (songID) => {
        try {
            // Send HTTP DELETE request to reject the report
            await axios.delete(`/admin/${songID}/reject-report`);
            // Handle success
            console.log('Report rejected successfully');
            // You may want to update the state or fetch notifications again after rejection
        } catch (error) {
            // Handle error
            console.error('Error rejecting report:', error);
        }
    };

    return (
        <div className="adminlists">
            <h2>
                 <span></span>
            </h2>
            <div>
                <div className="reports">
                    <div className="report" key={notification.notificationID}>
                        <div className="imgBox">
                            {notification.cover && <img className='imgBox' src={notification.cover} alt="" />}
                        </div>
                        <div className="section">
                            {/* Wrap song title in Link component }
                            <p>
                                <Link to={`/1/${notification.albumID}`}>{notification.songTitle}</Link>
                                <span className="spanArtist"> {notification.artistName}</span>
                            </p>
                            <div className="removereject">
                                {/* Add event handler to trigger deletion }
                                <div className="RemoveContent" onClick={() => handleDeleteSong(notification.songID)}>
                                    Remove Content
                                </div>
                                {/* Add event handler to trigger report rejection }
                                <div className="RejectReport" onClick={() => handleRejectReport(notification.songID)}> 
                                    Reject Report
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { AdminLists };*/
