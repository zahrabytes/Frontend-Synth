import React, { useState } from 'react';
import "./LoginSignup.css";


const LoginSignup = () => {

    const [action,setAction] = useState("Sign Up");

    return (
        <div className='container'>
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