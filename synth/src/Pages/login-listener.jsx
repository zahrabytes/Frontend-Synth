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
        <div className='form'>
            <h1>Listener Login</h1>
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
            <button type="submit" className="custom-button custom-button-primary" onClick={handleClick}>Login</button>
        </div>
    )
}

export default ListenerLogin;