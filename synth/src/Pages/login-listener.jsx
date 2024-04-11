import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

const ListenerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/listener-login', { email, password });
            console.log(response.data);
            const id = response.data.user.listenerID;
            navigate(`/${id}/user-home`);

        } catch (error) {
            console.error('Error during login:', error);
            // Handle error response from the server
        }
    }

    return (
        <div className='form'>
            <h1>Login Listener</h1>
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default ListenerLogin;