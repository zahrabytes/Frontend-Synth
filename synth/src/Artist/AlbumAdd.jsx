import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArtistLeft } from './LeftMenu'

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

    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/"+artistId+"/albums", album)
            navigate("/"+artistId+"/albums")
        } catch(err) {
            console.log(err)
        }
    }

    console.log(album)

    return (
        <div className="adminContainer">
            <ArtistLeft />
        <div className="form">
            <h1>Add new album</h1>
            <input type="text" placeholder='album name' onChange={handleChange} name='albumName' />
            <input type="text" placeholder='YYYY-MM-DD' onChange={handleChange} name='releaseDate' />
            <input type="text" placeholder='cover url' onChange={handleChange} name='cover' />
            <button className='formButton' onClick={handleClick}>Add</button>
        </div>
        </div>
    )
}

export default AlbumAdd