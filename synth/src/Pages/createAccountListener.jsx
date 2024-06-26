import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateAccountListener = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: '',
        gender: ' ',
        DoB: '',
        profilePic: '',
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, DoB: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!formData.fname || !formData.lname || !formData.email || !formData.username || !formData.password || !formData.gender || !formData.DoB) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://frontend-synth-3tzp.onrender.com/createAccount/listener', formData);
            console.log(response.data); // Handle successful response
            navigate('/login-listener'); // Navigate to /login-listener after successful form submission
        } catch (error) {
            console.error('Error creating account: ', error);
            setIsLoading(false);
            setError('An error occurred while creating the account. Please try again later.'); // Set error message
        }finally {
            setIsLoading(false); // Set loading state to false after API call
        }
    };

    return (
        <div className='form'>
            <h1>Listener Registration</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
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
                <label htmlFor="gender">Gender:</label> 
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                        <option value="OTHER">Other</option> 
                    </select>
                </div>
                <div>
                    <label htmlFor="DoB">Date of Birth</label>
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
                <button
                    type="submit"
                    className="custom-button custom-button-primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    >
                    {isLoading ? <div className="loader"></div> : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default CreateAccountListener;
