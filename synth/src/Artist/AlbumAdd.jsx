import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtistLeft } from './LeftMenu';
import { TbDiscountCheckFilled } from "react-icons/tb";


const AlbumAdd = () => {
    const { artistID } = useParams();
    const [album, setAlbum] = useState({
        albumName: "",
        releaseDate: "",
        cover: ""
    })
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

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setAlbum(prev=>({...prev, [e.target.name]: e.target.value }))
    }

    const handleDateChange = (date) => {
        setAlbum({ ...album, releaseDate: date });
    };


    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.post(`https://frontend-synth-3tzp.onrender.com/${artistID}/albums`, album);
            navigate(`/${artistID}/Artist-Home`);
        } catch(err) {
            console.log(err)
        }
    };

    console.log(album);

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
                  <span className="verified-text">You Are Verified!</span>{item.verified && <TbDiscountCheckFilled size={32} color="green" />}</div>
                </artistName>
              </div>
              <div className="followers-text">{item.num_followers} Followers</div>
            </div>
          ))}
          <div className="rectangle-backdrop2"></div>
        </div>
        <div className="adminContainer">
            <ArtistLeft />
        <div className="form">
            <h1>Add new album</h1>
            <input type="text" placeholder='Album Name' onChange={handleChange} name='albumName' />
            <div>
            <label htmlFor='releaseDate'>Release Date</label>
                    <DatePicker
                        closeOnScroll={(e) => e.target === document}
                        selected={album.releaseDate}
                        onChange={handleDateChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select Release Date"
                        required                    
                    />
            </div>       
            <input type="text" placeholder='cover url' onChange={handleChange} name='cover' />
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>
        </div>
        </div>
    )
}

export default AlbumAdd