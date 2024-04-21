import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from "../DateFormat.js";
import "./LeftMenu.css";

const ReportsList = () => {
  const { songID } = useParams();
  const [songInfo, setSongInfo] = useState([]);
  const [albumID, setAlbumID] = useState('');
  const [reports, setReports] = useState([]);
  const [mostFlaggedReason, setMostFlaggedReason] = useState(null);
  const [selected,setSelected]=useState('Select a Table to View');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`https://frontend-synth-3tzp.onrender.com/get-flag-details/${songID}`);
        setReports(response.data);

        const mostFlag = await axios.get(`https://frontend-synth-3tzp.onrender.com/${songID}/most-flagged-reason`);
        setMostFlaggedReason(mostFlag.data);

      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    const fetchSong = async () => {
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

      
      fetchReports(); 
      fetchSong();
  }, [songID]);

  const handleChange=(e)=>{
    console.log(e.target.value)
    setSelected(e.target.value)
}

  return (
    <div><h1>Reported Song Info:</h1>
    <div className='flex-container'>
      
      <div className='left-align-container'>
      {songInfo.map((song, index) => (
              <li key={index}>
                <div>
                <div>
                <h2>Song: {song.songTitle}</h2>
                  <audio controls src={song.filePath}></audio>
                  <h2>Song Artist: {song.artistName}</h2>
                  <img className='img-artist-report-pfp-display-after' src={song.profilePic}></img></div>
                  <div>
                  <h2>Song Album: {song.albumName}</h2></div>
                  <div>
                  <img className='img-display-after' src={song.Cover}></img>
                  </div>
                  </div>
              </li>
          ))}</div>
        <div className='right-align-container'>
        <select value={selected} onChange={(e)=>handleChange(e)}>
                    <option>Select a Table to View</option>
                    <option>Report Reason, Details of Reporting User, Time Reported</option>
                    <option>Most Reported Reason</option>
                </select>
                <div>
                    {selected === "Report Reason, Details of Reporting User, Time Reported"?<div>
        <h2>Flag Details:</h2>
        <table id="customers">
            <thead>
                <tr>
                    <th>Reason</th>
                    <th>Reported by</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report, index) => (
                    <tr key={index}>
                        <td>{report.reason}</td>
                        <td>{report.fname} {report.lname} ({report.username})</td>
                        <td>{formatDate(report.timestamp)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>:""}
                    {selected === "Most Reported Reason"?<div>
                    <h2>Most Flagged Reason:</h2>
                        {mostFlaggedReason ? (
                            <table id="customers">
                            <thead>
                                <tr>
                                    <th>Most Reported Reason:</th>
                                    <th>Count:</th>
                                </tr>
                            </thead>
                            <td>{mostFlaggedReason.reason}</td>
                            <td>{mostFlaggedReason.count}</td>
                            </table>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>:"" }
                </div></div>
    </div></div>
  );
};

export default ReportsList;