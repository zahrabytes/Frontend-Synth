import React, { useRef, useState } from 'react';
import './index.css';
//import axios from 'axios'
//import { useNavigate } from 'react-router-dom'

const AlbumAdd = () => {
    const [album, setAlbum] = useState({
        artistName: "",
        albumName: "",
        genre: "",
        releaseDate: "",
        cover: ""
    })
    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    const handleImageClick = () =>{
        inputRef.current.click();
    };

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        console.log(file);
        setImage(event.target.files[0]);
    };


    //const navigate = useNavigate()

    const handleChange = (e) =>{
        setAlbum(prev=>({...prev, [e.target.name]: e.target.value }))
    }

   /* const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:80/albums", album)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }*/

    console.log(album)

    return (
        <div>
            <subheader>Add new album</subheader>
            <div className='flex-container'>
                <div className='left-align-container'>
                        <div className="glass-album-page">
                            <div onClick= {handleImageClick}>
                                {image ? <img src={URL.createObjectURL(image)} alt="" className="img-display-after" /> 
                                : <img src="./upload image.png" alt="" className="img-display-before" />}
                                <input 
                                type="file" 
                                ref = {inputRef} 
                                onChange={handleImageChange} 
                                style={{display: "none"}}/>
                            </div>
                        </div>
                    <div className="glass-album-page">
                        <input type="text" placeholder="artist name" onChange={handleChange} name="artistName" />
                        <input type="text" placeholder='album name' onChange={handleChange} name='albumName' />
                        <input type="text" placeholder='genre' onChange={handleChange} name='genre' />
                        <input type="text" placeholder='YYYY-MM-DD' onChange={handleChange} name='releaseDate' />
                        <input type="text" placeholder='cover url' onChange={handleChange} name='cover' />
                        <button className='formButton' /*onClick={handleClick}*/>Publish Album</button>
                    </div>
                </div>
                <div className='right-align-container'>
                    <div className="glass-album-page">
                        <div className='song-flex-container'>
                            <input type="text" placeholder="song name" onChange={handleChange} name="artistName" />
                            <button>Add Song</button>
                        </div>
                    </div>
                    <div className="glass-album-page">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumAdd