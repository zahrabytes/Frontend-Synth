import React from 'react';
import { Link } from 'react-router-dom';

const LoginOptions = () => {
    return (
        <div>
                <h1 className="textwhite">Choose Your Login</h1>
            <div className="options-banner">
                <Link to="/login-admin" className="option">Login as Admin</Link>
                <Link to="/login-listener" className="option">Login as Listener</Link>
            </div>
        </div>
    );
}
export default LoginOptions;
