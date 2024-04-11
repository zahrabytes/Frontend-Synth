import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Albums = () => {
    const [albums, setAlbums] = useState([])
    const location = useLocation();
    const artistId = location.pathname.split("/")[1]

    useEffect(()=>{
        const fetchAllAlbums = async () => {
            try {
                const res = await axios.get("http://localhost:8800/"+artistId+"/albums")
                setAlbums(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllAlbums()
    }, [])

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:80/"+id+"/albums")
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Library</h1>
            <div className="albums">
                {albums.map(album=>(
                    <div className="album" key={album.albumID}>
                        {album.cover && <img src={album.cover} alt="" />}
                        <h2>{album.albumName}</h2>
                        <button className='upload'><Link to={`/${artistId}/upload/${album.albumID}`}>Upload Songs</Link></button>
                        <button className='update'><Link to={`/${artistId}/update/${album.albumID}`}>Update</Link></button>
                        <button className='delete' onClick={()=>handleDelete(album.albumID)}>Delete</button>
                    </div>
                ))}
            </div>
            <button>
                <Link to={`/${artistId}/albums/add`}>Add new album</Link>
            </button>
        </div>
    )
}

export default Albums