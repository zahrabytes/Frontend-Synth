import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

const ListenerLogin = () => {
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
            const response = await axios.post('https://frontend-synth-3tzp.onrender.com/listener-login', { email, password });
            console.log(response.data);
            const id = response.data.user.listenerID;
            navigate(`/${id}/user-home`);
        } catch (error) {
            console.error('Error during login:', error);
            setError('Invalid email or password');
            setIsLoading(false);
        } finally {
            setIsLoading(false); // Set loading state to false after API call
        }
    }

    return (
        <div>
        <div className='form'>
            <h1>Listener Login</h1>
           
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
        </div>
    )
}

export default ListenerLogin;
