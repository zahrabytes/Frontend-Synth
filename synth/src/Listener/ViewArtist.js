import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight, PiFlag, PiFlagFill  } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';
import { formatDate } from '../DateFormat.js';

function ViewArtist() {
    const { id, artistID } = useParams();
    const [artistResult, setArtistResult] = useState([]);
    const [albumResults, setAlbumResults] = useState([]);
    //const [artistFollowers, setArtistFollowers] = useState([]);
    const [isFollower, setIsFollower] = useState(false);
    const navigate = useNavigate();

    /*
    <div onClick={() => albumLike ? handleUnlikeAlbum() : handleLikeAlbum()}>
                            {albumLike ? <PiHeartFill /> : <PiHeartLight />}
                        </div>*/
  
    useEffect(() => {
        const fetchArtistAlbums = async () => {
            try {
              const artist = await axios.get(`http://localhost:8800/view-artist/${artistID}/`);
              setArtistResult(artist.data);
        
              const album = await axios.get(`http://localhost:8800/view-albums/${artistID}/`);

              setAlbumResults(album.data); 
            } catch (error) {
              console.error('Error searching:', error);
            }
          }; 
        fetchArtistAlbums(); 

        findIsFollower();
    }, [artistID, id]);

    /* /:artistID/:id/is-follower
    const findArtistFollowers = async () => { 
        try {
            const followers = await axios.get(`http://localhost:8800/${artistID}/artist-follower`);
            const followersData = followers.data;
            const followersDatamap = followersData.map(follower => follower.listenerID);
            setArtistFollowers(new Set(followersDatamap));

            const follower = followersDatamap.includes(id);
            setIsFollower(follower);

            console.log('followers found');
        } catch (error) {
            console.error('Error finding liked songs:', error);
        }
    };
    */

    const findIsFollower = async () => { 
        try {
            const followerTuple = await axios.get(`http://localhost:8800/${artistID}/${id}/is-follower`);
            
            // Check if the response data contains any elements
            const Follower = Object.keys(followerTuple.data).length > 0;
            
            // Set isFollower to true if the tuple isn't empty
            setIsFollower(Follower);

            console.log('followers found');
        } catch (error) {
            console.error('Error finding follower:', error);
        }
    };

    const handleAlbumSelect = (album) => {
        navigate(`/View-Album/${id}/${album}`);
    };

    // Follow Artist artistID
    const handleFollowArtist = async () => {
        try {
            await axios.post(`http://localhost:8800/${id}/${artistID}/follow-artist`);
            setIsFollower(true);
        } catch (error) {
            console.error('Error Following Artist:', error);
        }
    };
  
    // Unfollow Artist artistID
    const handleUnfollowArtist = async () => {
        try {
            await axios.delete(`http://localhost:8800/${id}/${artistID}/unfollow-artist`);
            setIsFollower(false);
        } catch (error) {
            console.error('Error Unfollowing Artist', error);
        }
    };

    return (
        <div>
            {artistResult.map((item, index) => (
              <div key={index}>
                <artistName>
                <img className='img-pfp-display-after' src={item.profilePic} alt={item.artistPic} />
                {item.artistName}</artistName>
                <div onClick={() => isFollower ? handleFollowArtist() : handleUnfollowArtist()}>
                            {isFollower ? <PiHeartFill /> : <PiHeartLight />}
                </div>
              </div> 
            ))}
            <div class="rectangle-backdrop"></div>

            {albumResults.map((album, index) => (
                    <li key={index}>
                        <div onClick={() => handleAlbumSelect(album.albumID)}>
                            <img className='img-display-after' src={album.cover} alt={album.cover} />
                        </div>
                        <div>
                            <h1 onClick={() => handleAlbumSelect(album.albumID)}>{album.albumName}</h1>
                            <p>{formatDate(album.releaseDate)}</p>
                            <p>{album.genre}</p>
                        </div>
                    </li>
                ))}
        </div>
    );
  }
  
  export default ViewArtist;
  