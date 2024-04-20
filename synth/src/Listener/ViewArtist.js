import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../DateFormat.js';
import '../index.css';
import { LeftMenu } from './LeftMenu.js';

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
              const artist = await axios.get(`http://localhost:8000/view-artist/${artistID}/`);
              setArtistResult(artist.data);
        
              const album = await axios.get(`http://localhost:8000/view-albums/${artistID}/`);

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
            const followers = await axios.get(`http://localhost:8000/${artistID}/artist-follower`);
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
            const followerTuple = await axios.get(`http://localhost:8000/${artistID}/${id}/is-follower`);
            
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
            await axios.post(`http://localhost:8000/${id}/${artistID}/follow-artist`);
            setIsFollower(true);
        } catch (error) {
            console.error('Error Following Artist:', error);
        }
    };
  
    // Unfollow Artist artistID
    const handleUnfollowArtist = async () => {
        try {
            await axios.delete(`http://localhost:8000/${id}/${artistID}/unfollow-artist`);
            setIsFollower(false);
        } catch (error) {
            console.error('Error Unfollowing Artist', error);
        }
    };

    return (
        <div className="listener-container">
            <LeftMenu />
            <div>
                <div class="rectangle-backdrop">
                    {artistResult.map((item, index) => (
                        <div key={index}>
                            <artistName>
                                <img className='img-pfp-display-after' src={item.profilePic} alt={item.artistPic} />
                                {item.artistName}
                                <div className="flex row">{item.verified ? <TbDiscountCheckFilled /> : null}</div>
                                <div className="heart-container" onClick={() => isFollower ? handleUnfollowArtist() : handleFollowArtist()}>
                                    {isFollower ? <PiHeartFill /> : <PiHeartLight />}
                                </div>
                                <div className='followers-text2'>{item.num_followers} Followers</div>
                            </artistName>
                        </div>
                    ))}
                </div>
    
                {albumResults.map((album, index) => (
                    <li key={index}>
                        <div onClick={() => handleAlbumSelect(album.albumID)}>
                            <img className='img-display-after' src={album.cover} alt={album.cover} />
                        </div>
                        <div className='album-info'> 
                            <h1 onClick={() => handleAlbumSelect(album.albumID)}>{album.albumName}</h1>
                            <p>{formatDate(album.releaseDate)}</p>
                            <p>{album.genre}</p>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
    
}

  
  export default ViewArtist;
  