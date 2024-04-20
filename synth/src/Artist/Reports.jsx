import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";

import { Chart as ChartJS, 
    ArcElement,   
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip, 
    Legend } from "chart.js/auto";
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TestReport = () => {
    const [genderReport, setGenderReport] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [ageReport, setAgeReport] = useState([]);
    const [ageList, setAgeList] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const [followersListeners, setFollowersListeners] = useState([]);
    const [doughnutData, setDoughnutData] = useState('genderReport');
    const [selected,setSelected]=useState('Gender of Followers')

    const handleChange=(e)=>{
        console.log(e.target.value)
        setSelected(e.target.value)
    }

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
                setTimestamp(timestamp.data);

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

  

    //   dataTimestamp
    return (
        <div>
            <artistName>Artist Dashboard</artistName>
            <h1>Listener Demographics</h1>
            <h2>Get to know your listeners through statistical reports.</h2>
            <div className='flex-container'>
            <div className='option-doughnut-container'>
                <select value={selected} onChange={(e)=>handleChange(e)}>
                    <option>Gender of Your Followers as Percentages</option>
                    <option>Percent of Synth Listeners Who Follow You</option>
                </select>
                <div className='chart-container'>
                    {selected === "Gender of Your Followers as Percentages"?<div>
                        <Doughnut options={optionsGender} data={dataGenderFollower} />
                                <table className='scrollbar-table'>
                                <h2>Your Followers And Their Gender:</h2>
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
                    {selected === "Percent of Synth Listeners Who Follow You"?<div><Doughnut options={optionsGender} data={dataFollowerListener} />
                    <table>
                                <h2>Your Followers Compared to All Listeners:</h2>
                                    <tbody className='scrollbar-table'>
                                    {followersListeners.map((follower, index) => (
                                        <tr key={index}>
                                        <td>{follower.label}</td>
                                        <td>{follower.percent}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table></div>:"" }
                </div>
            </div> 
                <div className='bar-chart-container'>
                    <Bar options={optionsBar} data={dataAgeReport}/>
                </div>
        </div>
        </div>
    );
};

export default TestReport;
