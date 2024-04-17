import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const TestReport = () => {
    const [genderReport, setGenderReport] = useState([]);
    const [ageReport, setAgeReport] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const gender = await axios.get(`http://localhost:8800/artist-gender-report`);
                setGenderReport(gender.data);

                const age = await axios.get(`http://localhost:8800/artist-age-report`);
                setAgeReport(age.data);
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchReport();
    }, []);

    return (
        <div>
            <h1>Listener Demographics</h1>
            <div className='doughnut'>
                <Doughnut 
                    data={{
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
                                ],
                            }
                        ],labels: genderReport.map((data) => {
                            if (data.gender === 'F') {
                                return "% of Female followers";
                            } else if (data.gender === 'M') {
                                return "% of Male followers";
                            } else { 
                                return "% of Other followers";
                            }
                        }),
                    }}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom', // Display legend at the bottom
                            },
                        },
                    }}
                />
            </div>
            <div className='doughnut'>
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
    );
};

export default TestReport;
