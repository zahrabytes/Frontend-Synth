// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import '../index.css';
// import { formatDate } from '../DateFormat.js';
// import { TbDiscountCheckFilled } from "react-icons/tb";

// function ArtistHome() {
//     const { artistID } = useParams();
//     const [artistResult, setArtistResult] = useState([]);
//     const [albumResults, setAlbumResults] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchArtistAlbums = async () => {
//             try {
//               const artist = await axios.get(`http://localhost:8000/view-artist/${artistID}/`);
//               setArtistResult(artist.data);
        
//               const album = await axios.get(`http://localhost:8000/view-albums/${artistID}/`);

//               setAlbumResults(album.data); 
//             } catch (error) {
//               console.error('Error searching:', error);
//             }
//           }; 
//         fetchArtistAlbums(); 
//     }, [artistID]);
    
//     const handleDelete = async (id)=>{
//         try{
//             await axios.delete(`http://localhost:8000/${id}/albums`)
//             window.location.reload()
//         } catch(err) {
//             console.log(err)
//         }
//     }

//     const handleAlbumSelect = (albumID) => {
//         navigate(`/ViewAlbumArtist/${artistID}/${albumID}`); 
//       };

//     return (
//         <div>
//             {artistResult.map((item, index) => (
//               <div key={index}>
//                 <artistName>
//                 <img className='img-pfp-display-after' src={item.profilePic} alt={item.artistPic} />
//                 {item.artistName}
//                 </artistName>
//                 <div className="flex row">{item.verified ? <TbDiscountCheckFilled /> : null}</div>
//               </div> 
//             ))}
//             <div class="rectangle-backdrop"></div>
//             <button onClick={ () => navigate(`/${artistID}/albums/add`)}>
//                 Add new album
//             </button>
//             {albumResults.map((album) => (
//                     <div  key={album.albumID}>
//                         <div onClick={() => handleAlbumSelect(album.albumID)}>
//                         <img className='album-cover' src={album.cover} alt="" />
//                         </div>
//                         <h2 onClick={() => handleAlbumSelect(album.albumID)}>{album.albumName}</h2>
//                         <button onClick={ () => navigate(`/${artistID}/upload/${album.albumID}`)}>
//                             Upload Songs
//                         </button>
//                         <button onClick={ () => navigate(`/${artistID}/update/${album.albumID}`)}>
//                             Update
//                         </button>
//                         <button onClick={() => handleDelete(album.albumID)}>Delete</button>
//                         <button onClick={ () => navigate(`/ViewAlbumArtist/${artistID}/${album.albumID}`)}>
//                             View Songs
//                         </button>
//                     </div>
//                 ))}
//         </div>
//     );
//   }
  
//   export default ArtistHome;
  

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
          const artist = await axios.get(`http://localhost:8000/view-artist/${artistID}/`);
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
              <div key={index}>
                <artistName>
                <img className='img-pfp-display-after' src={item.profilePic} alt={item.artistPic} />
                {item.artistName}
                </artistName>
                <div className="flex row">{item.verified ? <TbDiscountCheckFilled /> : null}</div>
              </div> 
            ))}
            <div class="rectangle-backdrop"></div>
        </div>
        <div className="adminContainer">
            <ArtistLeft />
            <Albums />
        </div>
    </div>
  );
}

export { ArtistHome };

