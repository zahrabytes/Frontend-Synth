import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const AlbumAdd = () => {
    const [album, setAlbum] = useState({
        artistName: "",
        albumName: "",
        genre: "",
        releaseDate: "",
        cover: ""
    })

    const location = useLocation();
    const artistId = location.pathname.split("/")[1]

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
            await axios.post("http://localhost:8800/"+artistId+"/albums", album);
            navigate("/"+artistId+"/albums");
        } catch(err) {
            console.log(err)
        }
    };

    console.log(album);

    return (
        <div className="form">
            <h1>Add new album</h1>
            <input type="text" placeholder='Album Name' onChange={handleChange} htmlFor='albumName' />
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
    )
}

export default AlbumAdd