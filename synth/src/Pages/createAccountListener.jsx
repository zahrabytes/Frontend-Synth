import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateAccountListener = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: '',
        DoB: null,
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

        try {
            const response = await axios.post('http://localhost:8800/createAccount/listener', formData);
            console.log(response.data); // Handle successful response
        } catch (error) {
            console.error('Error creating account: ', error);
            setError('An error occurred while creating the account. Please try again later.'); // Set error message
        }
    };

    return (
        <div className='form'>
            <h1>Listener Registration</h1>
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
                    <label htmlFor="DoB">Date of Birth</label>
                    <br />
                    <DatePicker
                        id="DoB"
                        name="DoB"
                        selected={formData.DoB}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select Date of Birth"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profilePic">Profile Picture Link</label>
                    <input
                        type="text"
                        id="profilePic"
                        name="profilePich"
                        value={formData.profilePic}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateAccountListener;