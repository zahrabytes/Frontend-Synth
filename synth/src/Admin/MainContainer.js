import axios from 'axios';
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from '../context/AdminContext';
import './LeftMenu.css';
import './MainContainer.css';

function MainContainer() {
    const { notifications, dispatch } = useContext(AdminContext);

    const navigate = useNavigate();
    useEffect(() => {
        // Function to fetch notifications from backend
        const fetchNotifications = async () => {
            try {
                const notifications = await axios.get(`https://frontend-synth-3tzp.onrender.com/fetch-notifications/1/`);
                dispatch({ type: 'SET_ADMIN', payload: notifications.data });
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications(); // Call the fetchNotifications function when component mounts
    }, [dispatch]);

    // Function to handle deleting a song
const handleDeleteSong = async (songID) => {
    try {
        // Send HTTP POST request to delete the song
        await axios.delete(`https://frontend-synth-3tzp.onrender.com/admin/${songID}/delete-song`);
        dispatch({ type: 'DELETE_ADMIN', payload: { _id: songID } });
        // Handle success
        console.log('Song deleted successfully');
    } catch (error) {
        // Handle error
        console.error('Error deleting song:', error);
    }
};

// Function to handle rejecting a report
const handleRejectReport = async (songID) => {
    try {
        // Send HTTP DELETE request to reject the report
        await axios.delete(`https://frontend-synth-3tzp.onrender.com/admin/${songID}/reject-report`);
        dispatch({ type: 'DELETE_ADMIN', payload: { _id: songID } });
        // Handle success
        console.log('Report rejected successfully');
    } catch (error) {
        // Handle error
        console.error('Error rejecting report:', error);
    }
};



    return (
        <div className="content-container">
        <div className='mainContainer'>
            <div className="menuList">
                <ul>
                    <li>
                        <a href="#">Admin Report Notifications</a>
                    </li>
                </ul>
            </div>
            <div>
                {/* Map over notifications and render AdminLists for each notification */}
                {notifications && notifications.map((notification, index) => (
                    <div className="admin-lists" key={index}>
                        <h2>
                             <span></span>
                        </h2>
                        <div className="reports">
                            <div className="report">
                                <div className="imgBox">
                                    {<img className='imgBox' src={notification.cover} alt="" />}
                                </div>
                                <div className="section">
                                    {/* Wrap song title in Link component */}
                                    <p>
                                    <div onClick={() => navigate(`/1/Get-Flag-Details/${notification.songID}`)} className="song-link">
                                        {notification.songTitle}
                                    </div>
                                        <span className="spanArtist"> {notification.artistName}</span>
                                    </p>
                                    <div className="removereject">
                                        {/* Add event handler to trigger deletion */}
                                        <div className="RemoveContent" onClick={() => handleDeleteSong(notification.songID)}>
                                            Remove Content
                                        </div>
                                        {/* Add event handler to trigger report rejection */}
                                        <div className="RejectReport" onClick={() => handleRejectReport(notification.songID)}> 
                                            Reject Report
                                        </div>
                                    </div>
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


export { MainContainer };

