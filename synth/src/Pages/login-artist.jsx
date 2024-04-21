import axios from 'axios'; // Import Axios for making HTTP requests
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginArtist = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!email || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post('https://frontend-synth-3tzp.onrender.com/artist-login', { email, password });
            console.log(response.data); // Handle response from the server
            const artistID = response.data.user.artistID;
            navigate(`/${artistID}/Artist-Home`);
        } catch (error) {
            console.error('Error during login:', error);
            setError('Invalid email or password');
            setIsLoading(false);
        }finally {
            setIsLoading(false);
        }
    }
 
    return (
        <div className='form'>
            <h1>Artist Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="fname">Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <div>
                <label htmlFor="fname">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <button
                type="submit"
                className="custom-button custom-button-primary"
                onClick={handleClick}
                disabled={isLoading}
            >
            {isLoading ? <div className="loader"></div> : 'Login'}
            </button>
        </div>
    )
}

export default LoginArtist;