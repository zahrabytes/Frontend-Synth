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
    const [ageReport, setAgeReport] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const [followersListeners, setFollowersListeners] = useState([]);
    const [doughnutData, setDoughnutData] = useState('genderReport');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const gender = await axios.get(`http://localhost:8000/artist-gender-report`);
                setGenderReport(gender.data);

                const age = await axios.get(`http://localhost:8000/artist-age-report`);
                setAgeReport(age.data);

                const timestamp = await axios.get(`http://localhost:8000/artist-age-timestamp`);
                setTimestamp(timestamp.data);

                const follow = await axios.get(`http://localhost:8000/artist-follower-listener`);
                setFollowersListeners(follow.data);
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchReport();
    }, []);

    const dataGender = {
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

      
      const dataFollowerListener = {
        datasets: [
            {
                data: followersListeners.map((data) => data.percent),
                backgroundColor: [
                    "rgba(0, 0, 0, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                ],
                borderColor: [
                    'rgb(227,232,236)',
                ],hoverOffset: 8
            },
            
        ], labels: followersListeners.map((data) => {
            if (data.label === "% of All Synth Listeners Who Follow You") {
                return data.percent + "% of All Synth Listeners Follow You";
            } else {
                return data.percent + "% of All Synth Listeners Do Not Follow You";
            }
        }),
      };

  

    //   dataTimestamp
    return (
        <div>
            <h1>Listener Demographics</h1>
            <div className='flex-container'>
            <div className='chart-container'>
            <Doughnut options={optionsGender} data={dataGender} />
            </div>
                <div className='chart-container'>
                <Bar
                    data={{
                        labels: ageReport.map((data) => data.age_bracket),
                        datasets: [
                        {
                            data: ageReport.map((data) => data.followers_count),
                            backgroundColor: [
                                "rgba(0, 0, 0, 0.6)",
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(116, 139, 158, 0.6)",
                            ],
                        },
                        ],
                    }}
            />
        </div>
        </div>
        </div>
    );
};

export default TestReport;
