import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLists } from "./AdminLists";
import './MainContainer.css';

function MainContainer() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Function to fetch notifications from backend
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:8800/fetch-notifications/1');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications(); // Call the fetchNotifications function when component mounts
    }, []);

    return (
        <div className='mainContainer'>
            <div className="menuList">
                <ul>
                    <li>
                        <a href="#">Active</a>
                    </li>
                    <li>
                        <a href="#">Resolved</a>
                    </li>
                    <li>
                        <Link to="/" className="roundedButton">Logout</Link>
                    </li>
                </ul>
            </div>
            <div>
            {/* Map over notifications and render AdminLists for each notification */}
            {notifications.map(notification => (
                <AdminLists key={notification.notificationID} notification={notification} />
            ))}
            </div>
        </div>
    );
}

export { MainContainer };
