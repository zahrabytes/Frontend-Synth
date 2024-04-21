import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../index.css";
import { formatDate } from "../DateFormat.js";
import { ArtistLeft } from './LeftMenu';
import { TbDiscountCheckFilled } from "react-icons/tb";
import '../index.css';

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js/auto";
import 'chartjs-plugin-datalabels';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TestReport = () => {
    const [genderReport, setGenderReport] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [ageReport, setAgeReport] = useState([]);
    const [ageList, setAgeList] = useState([]);
    const [followerTimestamp, setFollowerTimestamp] = useState([]);
    const [followersListeners, setFollowersListeners] = useState([]);
    const [selectedDoughnut,setSelectedDoughnut]=useState('');
    const [selectFirstTable,setSelectFirstTable]=useState('');
    const [selectBar,setSelectBar]=useState('Graph of Your Followers in Each Age Bracket');
    const [selectLine,setSelectLine]=useState('Graph of Your Followers Over Time');
    const {artistID} = useParams();

    const [followerTimestampList, setFollowerTimestampList] = useState([]);

    const handleChange=(e)=>{
        console.log(e.target.value);
        setSelectedDoughnut(e.target.value);
    };

    const handleFirstTableChange=(e)=>{
        console.log(e.target.value);
        setSelectFirstTable(e.target.value);
    };

    const handleBarChange=(e)=>{
        console.log(e.target.value);
        setSelectBar(e.target.value);
    };

    const handleLineChange=(e)=>{
        console.log(e.target.value);
        setSelectLine(e.target.value);
    };


    const navigate = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const gender = await axios.get(`https://frontend-synth-3tzp.onrender.com/artist-gender-report/${artistID}`);
                setGenderReport(gender.data);

                const gList = await axios.get(`https://frontend-synth-3tzp.onrender.com/artist-gender-list/${artistID}`);
                setGenderList(gList.data);

                const age = await axios.get(`https://frontend-synth-3tzp.onrender.com/artist-age-report/${artistID}`);
                setAgeReport(age.data);

                const aList = await axios.get(`https://frontend-synth-3tzp.onrender.com/artist-age-list/${artistID}`)
                setAgeList(aList.data);

                const timestamp = await axios.get(`https://frontend-synth-3tzp.onrender.com/artist-timestamp/${artistID}`);
                setFollowerTimestamp(timestamp.data);

                const timestamplist = await axios.get(`https://frontend-synth-3tzp.onrender.com/artist-timestamp-list/${artistID}`);
                setFollowerTimestampList(timestamplist.data);

                const follow = await axios.get(`https://frontend-synth-3tzp.onrender.com/artist-follower-listener/${artistID}`);
                setFollowersListeners(follow.data);
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchReport();
    }, [artistID]);

    const dataGenderFollower = {
        datasets: [
            {
                data: genderReport.map((data) => data.percentage),
                backgroundColor: [
                    "rgba(0, 0, 0, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(116, 139, 158, 0.6)",
                ],
                borderColor: [
                    'rgb(227,232,236)',
                ],hoverOffset: 8
            },
            
        ],labels: genderReport.map((data) => {
            if (data.gender === 'F') {
                return data.percentage + "% of your followers are Female";
            } else if (data.gender === 'M') {
                return data.percentage + "% of your followers are Male";
            } else { 
                return data.percentage + "% of your followers are Other";
            }
        }),
      };
    
      const optionsGender = {
        plugins: {
            legend: {
                position: 'bottom', 
            },
            datalabels: {
                formatter: (value) => {
                    return value + '%';
                },
            },
        },
      };

      const optionsBar = {
        Plugins: {
            Legend: {
                display: false, 
            },
        },
      };

      
      const dataFollowerListener = {
        datasets: [
            {
                data: followersListeners.map((data) => data.percent),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(0, 0, 0, 0.6)",
                ],
                borderColor: [
                    'rgb(227,232,236)',
                ],hoverOffset: 8
            },
            
        ], labels: followersListeners.map((data) => {
            if (data.label === "% of All Synth Listeners Who Follow You") {
                return data.percent + "% of Synth Listeners Follow You";
            } else {
                return data.percent + "% of Synth Listeners Do Not Follow You";
            }
        }),
      };

      const dataAgeReport = {
        datasets: [
            {
                data: ageReport.map((data) => data.followers_count),
                backgroundColor: [
                    "rgba(0, 0, 0, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(116, 139, 158, 0.6)",
                ],
            },
            ],labels: ageReport.map((data) => data.age_bracket),
      };

      const dataFollowerTimestamp = {
        datasets: [
          {
            label: 'Followers Gained',
            data: followerTimestamp.map(data => data.followers_gained),
            borderColor: "rgba(0, 0, 0)",
            fill: false,
          },
        ],
        labels: followerTimestamp.map(data => data.date),
      };

      const optionsLineTimestamp = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Followers Gained Over Time',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Followers Gained',
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
      };
      

  

    //   dataTimestamp
    return (
        <div className="adminContainer">
        <ArtistLeft />
        
        <div className="left-section">
            <h1>Listener Demographics</h1>
            <h2>Get to know your listeners through statistical reports.</h2>
            <div>
            <div className='chart-boxes'>
            <div className='option-doughnut-container'>
                <select value={selectedDoughnut} onChange={(e)=>handleChange(e)}>
                    <option>Pie Charts</option>
                    <option>Gender of Your Followers as Percentages</option>
                    <option>Percent of Synth Listeners Who Follow You</option>
                </select>
                <div  className='doughnut-content-container '>
                    {selectedDoughnut === "Gender of Your Followers as Percentages"?<div>
                        <Doughnut options={optionsGender} data={dataGenderFollower} /></div>:""}
                    {selectedDoughnut === "Percent of Synth Listeners Who Follow You"?<div>
                        <Doughnut options={optionsGender} data={dataFollowerListener} /></div>:"" }
                </div>
            </div> 
            <div className='option-doughnut-container'>
                <select value={selectFirstTable} onChange={(e)=>handleFirstTableChange(e)}>
                    <option>Tables</option>
                    <option>Count of Your Followers Gained 4/14-4/20</option>
                    <option>List of Your Followers Gained 4/14-4/20</option>
                    <option>Your Followers And Their Gender</option>
                    <option>Your Followers Compared to All Listeners</option>
                    <option>Count of Your Followers in Each Age Bracket</option>
                    <option>Your Followers And Their Ages</option>
                </select>
                
                <div className='doughnut-content-container '>
                {selectFirstTable === "Count of Your Followers Gained 4/14-4/20"?<div>
                    <h2>Your Followers Gained 4/14-4/20</h2>
                            <table  id ="customers">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Followers Gained</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {followerTimestamp.map((follower, index) => (
                                        <tr key={index}>
                                        <td>{follower.date}</td>
                                        <td>{follower.followers_gained}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>:""}
                    {selectFirstTable === "List of Your Followers Gained 4/14-4/20"?<div>
                    <h2>Your Followers Gained 4/14-4/20</h2>
                            <table  id ="customers">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {followerTimestampList.map((follower, index) => (
                                        <tr key={index}>
                                        <td>{follower.date}</td>
                                        <td>{follower.fname}</td>
                                        <td>{follower.lname}</td>
                                        <td>{follower.username}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>:""}
                    {selectFirstTable === "Your Followers And Their Gender"?<div>
                    <h2>Your Followers And Their Genders:</h2>
                            <table  id ="customers">
                                    <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Gender</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {genderList.map((follower, index) => (
                                        <tr key={index}>
                                        <td>{follower.fname}</td>
                                        <td>{follower.lname}</td>
                                        <td>{follower.username}</td>
                                        <td>{follower.gender}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>:""}
                    {selectFirstTable === "Your Followers Compared to All Listeners"?
                    <div className='doughnut-content-container '>
                            <table  id ="customers">
                                <h2>Your Followers VS All Listeners:</h2>
                                    <tbody>
                                    {followersListeners.map((follower, index) => (
                                        <tr key={index}>
                                        <td>{follower.label}: </td>
                                        <td>{follower.percent}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>:"" }
                </div>
                {selectFirstTable === "Count of Your Followers in Each Age Bracket"?
                <div className='doughnut-list-content-container '>
                    <h2>Count of Your Followers in Each Age Bracket:</h2>
                    <table id ="customers">
                                <thead>
                                    <tr>
                                        <th>Bracket</th>
                                        <th>Follower Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {ageReport.map((item, index) => (
                                        <tr key={index}>
                                        <td>{item.age_bracket}</td>
                                        <td>{item.followers_count}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>:"" }
                    {selectFirstTable === "Your Followers And Their Ages"?<div className='doughnut-content-container'>
                    <table id ="customers">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Age</th>
                            </tr>
                            </thead>
                                <tbody>
                                {ageList.map((follower, index) => (
                                    <tr key={index}>
                                        <td>{follower.fname}</td>
                                        <td>{follower.lname}</td>
                                        <td>{follower.username}</td>
                                        <td>{follower.age}</td>
                                        </tr>
                                    ))}
                                </tbody>
                    </table>
                    </div>:"" }
            </div> 
            </div></div>
            <div>
            <div>
                <select value={selectBar} onChange={(e)=>handleBarChange(e)}>
                    <option>Select Option</option>
                    <option>Graph of Your Followers in Each Age Bracket</option>
                </select>
                <div className='doughnut-bar-content-container '>
                    {selectBar === "Graph of Your Followers in Each Age Bracket"?<div>
                        <Bar className='bar-chart-container' options={optionsBar} data={dataAgeReport}/></div>:""}
                </div>
        </div> 
        <div>
        <div>
        <select value={selectLine} onChange={(e)=>handleLineChange(e)}>
                    <option>Select Option</option>
                    <option>Graph of Your Followers Over Time</option>
                </select>
                <div className='doughnut-bar-content-container'>
                    {selectLine === "Graph of Your Followers Over Time"?<div>
                        <Line className='bar-chart-container' options={optionsLineTimestamp} data={dataFollowerTimestamp} />
                        </div>:""}
                </div>
        </div> 
        </div></div>
    </div>
    </div>
    );
};

export default TestReport;
