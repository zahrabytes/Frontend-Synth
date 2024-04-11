import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
    const [userType, setUserType] = useState(null);

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <div>
            <h2>Create Account</h2>
            <div>
                <input
                    type="radio"
                    id="artist"
                    name="userType"
                    value="artist"
                    onChange={handleUserTypeChange}
                />
                <label htmlFor="artist">Artist</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="listener"
                    name="userType"
                    value="listener"
                    onChange={handleUserTypeChange}
                />
                <label htmlFor="listener">Listener</label>
            </div>
            <div>
                {userType && (
                    <Link to={`${userType}Registration`}>
                        <button>Create Account as {userType}</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CreateAccount;