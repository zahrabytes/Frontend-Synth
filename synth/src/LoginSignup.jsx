import React, { useState } from 'react';
import './index.css';

<<<<<<< HEAD

const LoginSignup = () => {

    const [action,setAction] = useState("Sign Up");
=======
const LoginSignup = () => {
    const [action, setAction] = useState('Sign Up');
    const [selectedOption, setSelectedOption] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

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
        // Proceed with form submission
        console.log('Form submitted:', fname, lname, email, password, dob, selectedOption);
        // Add logic to send form data to server for sign-up
    };
>>>>>>> kevin

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
<<<<<<< HEAD
            <div className="options-banner">
                <div className="option">Listener</div>
                <div className="option">Artist</div>
                <div className="option">Admin</div>
            </div>
        ) : null}
            <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                <img src="" alt="" />
                <input type="text" placeholder="Name"/>
            </div>}
            
            <div className="input">
                <img src="" alt="" />
                <input type="email" placeholder="Email Id"/>
            </div>
            <div className="input">
                <img src="" alt="" />
                <input type="password" placeholder="Password"/>
            </div>
            </div>
            {action==="Sign Up"?<div></div>:<div ClassName="forgot-password">Lost Password? <span>Click Here!</span></div>}
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup
=======
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
>>>>>>> kevin
