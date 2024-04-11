import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AlbumUpdate = () => {
    const [album, setAlbum] = useState({
        artistName: "",
        albumName: "",
        genre: "",
        releaseDate: "",
        cover: ""
    })

    const navigate = useNavigate()
    const location = useLocation()

    const artistID = location.pathname.split("/")[1]
    const id = location.pathname.split("/")[3]

    const handleChange = (e) =>{
        setAlbum(prev=>({...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/"+id+"/albums", album)
            navigate("/"+artistID+"/albums")
        } catch(err) {
            console.log(err)
        }
    }

    console.log(album)

    return (
        <div className="form">
            <h1>Update the Album</h1>
            <input type="text" placeholder='album name' onChange={handleChange} name='albumName' />
            <input type="text" placeholder='YYYY-MM-DD' onChange={handleChange} name='releaseDate' />
            <input type="text" placeholder='cover url' onChange={handleChange} name='cover' />
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    )
}

export default AlbumUpdate