import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
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
            navigate(`/${response.data.user.artistID}/albums`);
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error response from the server
        }
    }

    return (
        <div className='form'>
            <h1>Login Artist</h1>
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button onClick={handleClick}>Login</button> {/* Removed parentheses */}
        </div>
    )
}

export default LoginArtist