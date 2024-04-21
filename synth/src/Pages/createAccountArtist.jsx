import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateAccountArtist = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        artistName: '',
        email: '',
        password: '',
        genre: '',
        DoB: '',
        profilePic: '',
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, DoB: date })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.fname || !formData.lname || !formData.artistName || !formData.email || !formData.password || !formData.genre || !formData.DoB) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('https://frontend-synth-3tzp.onrender.com/createAccount/artist', formData);
            console.log(response.data);
            navigate('/login-artist'); // Navigate to /login-artist after successful form submission
        } catch (error) {
            console.error('Error creating account: ', error);
            setError('An error occurred while creating the account. Please try again later.');
        }
    };

    return (
        <div className='form'>
            <h1>Artist Registration</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="artistName">Artist Name</label>
                    <input
                        type="text"
                        id="artistName"
                        name="artistName"
                        value={formData.artistName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="DoB">Date of Birth</label>
                    <br />
                    <DatePicker
                        closeOnScroll={(e) => e.target === document}
                        selected={formData.DoB}
                        onChange={handleDateChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select Date of Birth"
                        required                    
                    />
                </div>
                <div>
                    <label htmlFor="profilePic">Profile Picture Link</label>
                    <input
                        type="text"
                        id="profilePic"
                        name="profilePic"
                        value={formData.profilePic}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateAccountArtist;
