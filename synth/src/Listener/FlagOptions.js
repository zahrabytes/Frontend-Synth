// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const FlagOptions = ({ song }) => { // Receive song as a prop
//   const { id, songID } = useParams(); // Retrieve id and songID from URL params
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     reason: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a POST request to backend endpoint
//       const response = await axios.post(`http://localhost:8800/submit-report/${id}/${songID}`, formData);
//       console.log(response.data);
//       navigate(`/submit-report/${id}/${songID}`);
//       // Optionally, you can display a success message or redirect the user
//     } catch (error) {
//       console.error('Error submitting report:', error);
//       setError('An error occurred while submitting the report. Please try again later.');
//       // Optionally, you can display an error message to the user
//     }
//   };

//   return (
//     <div className="container-album">
//       <ul className="song-list">
//         <li className="song-item">
//           <div>
//             <p>{song.artist}</p>
//             <p>{song.genre}</p>
//             <audio controls src={song.filePath}></audio>
//             <h2>{song.songTitle}</h2>
//           </div>
//         </li>
//       </ul>
//       <div className="form">
//         <h1>Submit a Report</h1>
//         {error && <div className="error">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="reason">Reason:</label>
//             <select id="reason" name="reason" value={formData.reason} onChange={handleChange} required>
//               <option value="">Select Reason</option>
//               <option value="Abusive Behavior">Abusive Behavior</option>
//               <option value="Quality Control">Quality Control</option>
//               <option value="Technical Issues">Technical Issues</option>
//               <option value="Copyright Infringement">Copyright Infringement</option>
//               <option value="Misrepresentation/Impersonation">Misrepresentation/Impersonation</option>
//             </select>
//           </div>
//           <button type="submit" className="custom-button custom-button-primary">
//             Submit Report
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FlagOptions;


