import React, { useState } from 'react';
import './index.css';



const LoginSignup = () => {
    
    const [action, setAction] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    const handleActionToggle = () => {
        setAction(action === 'Sign Up' ? 'Login' : 'Sign Up');
    };

    const handleSignUp = async () => {
        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            if (response.ok) {
                console.log('User signed up successfully');
            } else {
                console.error('Failed to sign up');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            });
            if (response.ok) {
                console.log('User logged in successfully');
            } else {
                console.error('Failed to log in');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div className='glass'>
            <div className="home-button">
            <button className="home-button">Home</button>
        </div>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {action === "Sign Up" ? (
            <div className="options-banner">
                <div className="option">Listener</div>
                <div className="option">Artist</div>
                <div className="option">Admin</div>
            </div>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            {action === 'Sign Up' && (
                <div className='options-banner'>
                    <div className='option'>Listener</div>
                    <div className='option'>Artist</div>
                    <div className='option'>Admin</div>
                </div>
            )}
            <div className='inputs'>
                {action === 'Sign Up' && (
                    <div className='input'>
                        <img src='' alt='' />
                        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}

                <div className='input'>
                    <img src='' alt='' />
                    <input type='email' placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <img src='' alt='' />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === 'Sign Up' && (
                <div className='submit-container'>
                    <div className='submit' onClick={handleSignUp}>
                        Sign Up
                    </div>
                    <div className='submit gray' onClick={handleActionToggle}>
                        Login
                    </div>
                </div>
            )}
            {action === 'Login' && (
                <div className='submit-container'>
                    <div className='submit' onClick={handleLogin}>
                        Login
                    </div>
                    <div className='submit gray' onClick={handleActionToggle}>
                        Sign Up
                    </div>
                </div>
            )}
        </div>
    );
};


export default LoginSignup