import axios from 'axios'; // Import Axios for making HTTP requests
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('https://frontend-synth-3tzp.onrender.com/admin-login', { email, password });
            console.log(response.data); // Handle response from the server
            //const id = response.data.user.adminID;
            navigate('/1/Admin-Home');
        } catch (error) {
            console.error('Error during login:', error);
            setIsLoading(false);
            // Handle error response from the server
        }finally {
            setIsLoading(false); // Set loading state to false after API call
        }
    }

    return (
        <div className='form'>
                <h1>Admin Login</h1>
                <div>
                <label htmlFor="fname">Email</label>
                    <input
                        type="text"
                        placeholder=" Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                <label htmlFor="fname">Password</label>
                    <input
                        type="password"
                        placeholder=" Password"
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

export default LoginAdmin;