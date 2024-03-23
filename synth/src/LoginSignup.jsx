import React, { useState } from 'react';
import './index.css';

const LoginSignup = () => {
    const [action, setAction] = useState('Sign Up');
    const [selectedOption, setSelectedOption] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [loginClickedOnce, setLoginClickedOnce] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form submission
        if (!selectedOption) {
            alert('Please select an account type.');
            return;
        }
        
        // Destructure form data
        const formData = { fname, lname, email, password, dob };

        // Determine the user type based on selectedOption
        const userType = selectedOption.toLowerCase();

        // Proceed with form submission
        console.log('Form submitted:', formData, selectedOption);

        // Add logic to send form data to server
        if (action === "Sign Up") {
            fetch(`http://localhost:8800/users/${userType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                // Handle response as needed
            })
            .catch(error => {
                console.error('Error connecting to backend:', error);
                // Handle error as needed
            });
        } else if (action === "Login") {
            // Check if login is clicked for the second time
            if (loginClickedOnce) {
                // Add logic to connect to the backend for login
                fetch(`http://localhost:8800/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from server:', data);
                    // Handle response as needed
                })
                .catch(error => {
                    console.error('Error connecting to backend:', error);
                    // Handle error as needed
                });
            } else {
                setLoginClickedOnce(true);
            }
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
                    <div
                        className={`option ${selectedOption === 'Listener' ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('Listener')}
                    >
                        Listener
                    </div>
                    <div
                        className={`option ${selectedOption === 'Artist' ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('Artist')}
                    >
                        Artist
                    </div>
                    <div
                        className={`option ${selectedOption === 'Admin' ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('Admin')}
                    >
                        Admin
                    </div>
                </div>
            ) : null}
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {action === "Login" ? null : (
                        <div className="input">
                            <img src="" alt="" />
                            <input
                                type="text"
                                placeholder="First Name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </div>
                    )}
                    {action === "Login" ? null : (
                        <div className="input">
                            <img src="" alt="" />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="input">
                        <img src="" alt="" />
                        <input
                            type="email"
                            placeholder="Email Id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src="" alt="" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {action === "Login" ? null : (
                        <div className="input">
                            <img src="" alt="" />
                            <input
                                type="date"
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                    )}
                </div>
                {action === "Sign Up" ? null : (
                    <div className="forgot-password">
                        Lost Password? <span>Click Here!</span>
                    </div>
                )}
                <div className="submit-container">
                    <div
                        className={action === "Login" ? "submit gray" : "submit"}
                        onClick={() => setAction("Sign Up")}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === "Sign Up" ? "submit gray" : "submit"}
                        onClick={() => setAction("Login")}
                    >
                        Login
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginSignup;
