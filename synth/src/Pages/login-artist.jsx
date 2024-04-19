import axios from 'axios'; // Import Axios for making HTTP requests
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginArtist = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/artist-login', { email, password });
            console.log(response.data); // Handle response from the server
            navigate(`/${response.data.user.artistID}/artist-home`);
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error response from the server
        }
    }

    return (
        <div className='glass'>
            <div className='header'>
                <h1 className='textwhite'>Artist Login</h1>
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

export default LoginArtist