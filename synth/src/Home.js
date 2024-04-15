import React from 'react';
import './home.css'
function Home () {
  return (
    <div className='main'>
        <div className="overlay"></div>
        <img src='https://storage.googleapis.com/bucket-tester-2/youtube-video-gif.gif'alt="GIF"/>
        <div className="content">
            <div className="hover">
                <homeheader>Synth</homeheader>
            </div>
        </div>
    </div>
  )
}

export default Home;
