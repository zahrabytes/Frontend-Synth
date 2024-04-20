import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginOptions = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <h1 className="TryNow">Try it now</h1>
            <div className="options-banner">
                <Link to="/registration" className="option">Register</Link>
                <button className="dropdown-button" onClick={toggleDropdown}>Login</button>
                {showDropdown && (
                    <div className="dropdown-menu">
                        <Link to="/login-listener" className="option1">Login as Listener</Link>
                        <Link to="/login-artist" className="option1">Login as Artist</Link>
                        <Link to="/login-admin" className="option1">Login as Admin</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginOptions;
