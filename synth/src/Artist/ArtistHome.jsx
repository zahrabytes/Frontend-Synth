import { useParams } from "react-router-dom";
import "../Admin/LeftMenu.css";
import "../Admin/MainContainer.css";
import Albums from "./Albums";
import { ArtistLeft } from "./LeftMenu";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TbDiscountCheckFilled } from "react-icons/tb";
import '../index.css';

function ArtistHome() {
    
  const { artistID } = useParams();
  const [artistResult, setArtistResult] = useState([]);

  useEffect(() => {
    const fetchArtistAlbums = async () => {
        try {
          const artist = await axios.get(`https://frontend-synth-3tzp.onrender.com/view-artist/${artistID}/`);
          setArtistResult(artist.data);
        } catch (error) {
          console.error('Error searching:', error);
        }
      }; 
    fetchArtistAlbums(); 
}, [artistID]);

  console.log(artistID); // Check if id is logged correctly
  return (
    <div>
        <div>
          {artistResult.map((item, index) => (
            <div key={index} className="artist-container">
              <div className="artist-info">
                <img className="img-pfp-display-after" src={item.profilePic} alt={item.artistPic} />
                <artistName className="name-and-verified">
                  <span className="artist-name">{item.artistName}</span>
                  <div className="verified-indicator">
                  <span className="verified-text">You Are Verified!</span>{item.verified ? <TbDiscountCheckFilled size={32} color="green" /> : null}</div>
                </artistName>
              </div>
              <div className="followers-text">{item.num_followers} Followers</div>
            </div>
          ))}
          <div className="rectangle-backdrop2"></div>
        </div>
        <div className="adminContainer">
            <ArtistLeft />
            <Albums />
        </div>
    </div>
  );
}

export { ArtistHome };

