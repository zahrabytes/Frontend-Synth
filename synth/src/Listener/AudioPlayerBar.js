import React from 'react';
import '../index.css';

const AudioPlayerBar = ({ songTitle, filePath}) => {
  return (
    <div className="audio-player-bar">
      <p>{songTitle}</p>
      <audio controls src={filePath}></audio>
    </div>
  );
};

export { AudioPlayerBar };
