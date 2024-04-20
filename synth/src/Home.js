import React from 'react';
import Disclaimer from './Disclaimer';
import LoginOptions from './LoginOptions';

const Home = () => {
    return (
        <div className='flex-container'>
            <div className='content-container'><Disclaimer /></div>
            <div className='content-container'><LoginOptions /></div>
        </div>
    );
}

export default Home;