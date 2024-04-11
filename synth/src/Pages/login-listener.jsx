import axios from 'axios';
import React, { useState } from 'react';
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
        <div className='glass'>
            <div className='header'>
                <h1 className='text'>Listener Login</h1>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input
                        type="text"
                        placeholder=" Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <input
                        type="password"
                        placeholder=" Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='forgot-password'>
                    <span>Forgot Password?</span>
                </div>
            </div>
            <div className='submit-container'>
                <button className='submit' onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default ListenerLogin;