import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtistLeft } from './LeftMenu';

const AlbumUpdate = () => {
    const {artistID} = useParams();
    const {albumID} = useParams();
    const [album, setAlbum] = useState({
        artistName: "",
        albumName: "",
        genre: "",
        releaseDate: "",
        cover: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setAlbum(prev=>({...prev, [e.target.name]: e.target.value }))
    }

    const handleDateChange = (date) => {
        setAlbum({ ...album, releaseDate: date });
    };

    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.put(`https://frontend-synth-3tzp.onrender.com/${albumID}/albums`, album)
            navigate(`/${artistID}/Artist-Home`);
        } catch(err) {
            console.log(err)
        }
    }

    console.log(album)

    return (
        <div className="adminContainer">
            <ArtistLeft />
        <div className="form">
            <h1>Update the Album</h1>
            <input type="text" placeholder='album name' onChange={handleChange} name='albumName' />
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
            <input type="text" placeholder='cover url' onChange={handleChange} name='cover' />
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
        </div>
    )
}

export default AlbumUpdate