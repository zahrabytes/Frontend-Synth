import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from "../DateFormat.js";

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
        const response = await axios.get(`http://localhost:8000/get-flag-details/${songID}`);
        setReports(response.data);

        const mostFlag = await axios.get(`http://localhost:8000/get-flag-details/${songID}/most-flagged-reason`);
        setMostFlaggedReason(mostFlag.data);

      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    const fetchSong = async () => {
        try {
          const song = await axios.get(`http://localhost:8000/${songID}/song-info`);
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
    <div>
      <div className='content-container2'>
      {songInfo.map((song, index) => (
              <li key={index}>
                <h1>Reported Song:</h1>
                  <h2>Song Artist: {song.artistName}</h2>
                  <img className='img-pfp-display-after' src={song.profilePic}></img>
                  <h2>Song Album: {song.albumName}</h2>
                  <img className='img-display-after' src={song.Cover}></img>
                  <h2>Song: {song.songTitle}</h2>
                  <audio controls src={song.filePath}></audio>
              </li>
          ))}
          </div>
<select value={selected} onChange={(e)=>handleChange(e)} className="custom-select">
                    <option>Select a Table to View</option>
                    <option>Report Reason, Details of Reporting User, Time Reported</option>
                    <option>Most Reported Reason</option>
                </select>
                <div>
                    {selected === "Report Reason, Details of Reporting User, Time Reported"?<div className='chart-container'>
                    <h2>Flag Details:</h2>
                    {reports.map((report, index) => (
                    <li key={index}>
                        <p>Reason: {report.reason}</p>
                        <p>Reported by: {report.fname} {report.lname} ({report.username})</p>
                        <p>Timestamp: {formatDate(report.timestamp)}</p>
                    </li>
                    ))}
                    </div>:""}
                    {selected === "Most Reported Reason"?<div className='chart-container'>
                    <h2>Most Flagged Reason:</h2>
                        {mostFlaggedReason ? (
                            <div>
                            <p>Most Reported Reason: {mostFlaggedReason.reason}</p>
                            <p>Count: {mostFlaggedReason.count}</p>
                            </div>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>:"" }
                </div>
    </div>
  );
};

export default ReportsList;

