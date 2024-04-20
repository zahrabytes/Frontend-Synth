import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Landing () {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Home`);
  };
  return (
    <div className='home-container' onClick={handleClick}>
        <div className="overlay"></div>
        <img src='https://storage.googleapis.com/bucket-tester-2/youtube-video-gif.gif'alt="GIF"/>
        <div className="content">
          <header>Synth</header>
          <h1>Click to Login</h1> 
          <div>Music Library for exploring, discovering, and enjoying your favorite songs</div>
        </div>
    </div>
  )
}

export default Landing;
