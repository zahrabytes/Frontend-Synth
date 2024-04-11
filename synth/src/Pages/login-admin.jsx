import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useHistory

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/admin-login', { email, password });
            console.log(response.data); // Handle response from the server
            const id = response.data.user.adminID;
            navigate(`/${id}/Admin-Home`);
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error response from the server
        }
    }

    return (
        <div className='form'>
            <h1>Login Admin</h1>
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
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default LoginAdmin;