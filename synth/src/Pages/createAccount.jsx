import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registration.css';

const CreateAccount = () => {
    const [userType, setUserType] = useState(null);

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <div className="glass">
            <h2 className="textwhite">Create Account</h2>
            <div className="inputs">
                <div className="input">
                    <input
                        type="radio"
                        id="artist"
                        name="userType"
                        value="artist"
                        onChange={handleUserTypeChange}
                    />
                    <label htmlFor="artist" className="text">Artist</label>
                </div>
                <div className="input">
                    <input
                        type="radio"
                        id="listener"
                        name="userType"
                        value="listener"
                        onChange={handleUserTypeChange}
                    />
                    <label htmlFor="listener" className="text">Listener</label>
                </div>
            </div>
            <div className="submit-container">
                {userType && (
                    <Link to={`${userType}Registration`}>
                        <button className="submit">Create Account as {userType}</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CreateAccount;