import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import { formatDate } from "../DateFormat.js";

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
    const [selectBar,setSelectBar]=useState('');
    const [selectLine,setSelectLine]=useState('');

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
                const gender = await axios.get(`http://localhost:8000/artist-gender-report`);
                setGenderReport(gender.data);

                const gList = await axios.get(`http://localhost:8000/artist-gender-list`);
                setGenderList(gList.data);

                const age = await axios.get(`http://localhost:8000/artist-age-report`);
                setAgeReport(age.data);

                const aList = await axios.get(`http://localhost:8000/artist-age-list`)
                setAgeList(aList.data);

                const timestamp = await axios.get(`http://localhost:8000/artist-timestamp`);
                setFollowerTimestamp(timestamp.data);

                const follow = await axios.get(`http://localhost:8000/artist-follower-listener`);
                setFollowersListeners(follow.data);
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchReport();
    }, []);

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

      const optionsLine = {
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
        <div>
            <artistName>Artist Dashboard</artistName>
            <h1>Listener Demographics</h1>
            <h2>Get to know your listeners through statistical reports.</h2>
            <div>
            <div className='option-doughnut-container'>
                <select value={selectedDoughnut} onChange={(e)=>handleChange(e)}>
                    <option>Select Option</option>
                    <option>Gender of Your Followers as Percentages</option>
                    <option>Percent of Synth Listeners Who Follow You</option>
                </select>
                <div className='chart-container'>
                    {selectedDoughnut === "Gender of Your Followers as Percentages"?<div>
                        <Doughnut options={optionsGender} data={dataGenderFollower} /></div>:""}
                    {selectedDoughnut === "Percent of Synth Listeners Who Follow You"?<div>
                        <Doughnut options={optionsGender} data={dataFollowerListener} /></div>:"" }
                </div>
            </div> 
            <div className='option-doughnut-container'>
                <select value={selectFirstTable} onChange={(e)=>handleFirstTableChange(e)}>
                    <option>Select Option</option>
                    <option>Your Followers And Their Gender</option>
                    <option>Your Followers Compared to All Listeners</option>
                </select>
                <div className='chart-container'>
                    {selectFirstTable === "Your Followers And Their Gender"?<div>
                            <table className='scrollbar-table'>
                                <h2>Your Followers And Their Genders:</h2>
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
                    <div>
                            <table>
                                <h2>Your Followers
                                    Compared to All Listeners:</h2>
                                    <tbody className='scrollbar-table'>
                                    {followersListeners.map((follower, index) => (
                                        <tr key={index}>
                                        <td>{follower.label}: </td>
                                        <td>{follower.percent}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>:"" }
                </div>
            </div> 
            </div>
            <div >
                <select value={selectBar} onChange={(e)=>handleBarChange(e)}>
                    <option>Select Option</option>
                    <option>Graph of Your Followers in Each Age Bracket</option>
                    <option>Count of Your Followers in Each Age Bracket</option>
                    <option>Your Followers And Their Ages</option>
                </select>
                <div className='bar-chart-container'>
                    {selectBar === "Graph of Your Followers in Each Age Bracket"?<div>
                        <Bar options={optionsBar} data={dataAgeReport}/></div>:""}
                    {selectBar === "Count of Your Followers in Each Age Bracket"?<div>
                    <table className='scrollbar-table'>
                                <h2>Count of Your Followers in Each Age Bracket:</h2>
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
                    {selectBar === "Your Followers And Their Ages"?<div>
                    <table className='scrollbar-table'>
                        <h2>Your Followers And Their Ages:</h2>
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
        </div> 
        <div className='bar-chart-container'>
        <Line options={optionsLine} data={dataFollowerTimestamp} /></div>
    </div>
    );
};

export default TestReport;
