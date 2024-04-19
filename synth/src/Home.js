import React from 'react';
import Disclaimer from './Disclaimer';
import LoginOptions from './LoginOptions';

const Home = () => {
    return (
        <div className='flex-container'>
            <div className='right-align-container'><Disclaimer /></div>
            <div className='left-align-container'><LoginOptions /></div>
        </div>
    );
}

export default Home;