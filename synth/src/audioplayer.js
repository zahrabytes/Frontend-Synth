import React, { useRef } from 'react';

function AudioPlayer() {
  const audioPlayerRef = useRef(null);

  const playAudioFromURL = (url) => {
    audioPlayerRef.current.src = url;
    audioPlayerRef.current.play();
  };

  return (
    <div>
      <audio controls ref={audioPlayerRef}>
        Your browser does not support the audio element.
      </audio>
      <button onClick={() => playAudioFromURL('https://storage.googleapis.com/bucket-tester-2/examplesongid.mp3')}>Play Audio</button>
    </div>
  );
}

export default AudioPlayer;
