import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FlagOptions = () => { 
  const { id, songID } = useParams(); // Retrieve id and songID from URL params
  const navigate = useNavigate();
  const [songInfo, setSongInfo] = useState([]);
  const [albumID, setAlbumID] = useState('');
  const [formData, setFormData] = useState({
    reason: '',
  });
  // const [error, setError] = useState(''); 

  useEffect(() => {
    const loadPage = async () => {
        try {
          const song = await axios.get(`https://frontend-synth-3tzp.onrender.com/${songID}/song-info`);
          setSongInfo(song.data);

          if (song.data.length > 0) {
            setAlbumID(song.data[0].albumID);
          }

        } catch (error) {
          console.error('Error searching:', error);
        }
      };   
      loadPage(); 
    }, [songID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to backend endpoint
      const response = await axios.post(`https://frontend-synth-3tzp.onrender.com/report/${songID}/${id}`,  { reason: formData.reason });
      console.log(response.data);
      navigate(`/View-Album/${id}/${albumID}`);
      // Optionally, you can display a success message or redirect the user
    } catch (error) {
      console.error('Error submitting report:', error);
      // setError('An error occurred while submitting the report. Please try again later.');
      // Optionally, you can display an error message to the user
    }
  };



  return (
    <div>
      <div>
        <h1>Submit a Report</h1>
        <ul>
          {songInfo.map((song, index) => (
              <li key={index}>
                <h1>Reporting Song:</h1>
                  <h2>Song Artist: {song.artistName}</h2>
                  <img className='img-pfp-display-after' src={song.profilePic}></img>
                  <h2>Song Album: {song.albumName}</h2>
                  <img className='img-display-after' src={song.Cover}></img>
                  <h2>Song: {song.songTitle}</h2>
                  <audio controls src={song.filePath}></audio>
              </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reason">Reason:</label>
            <select id="reason" name="reason" value={formData.reason} onChange={handleChange} required>
              <option value="">Select Reason</option>
              <option value="Abusive Behavior">Abusive Behavior</option>
              <option value="Quality Control">Quality Control</option>
              <option value="Technical Issues">Technical Issues</option>
              <option value="Copyright Infringement">Copyright Infringement</option>
              <option value="Misrepresentation/Impersonation">Misrepresentation/Impersonation</option>
            </select>
          </div>
          <button type="submit" className="custom-button custom-button-primary">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlagOptions;


