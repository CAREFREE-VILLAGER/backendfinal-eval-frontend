import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: ''
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); 

  const { name, email, password, gender } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://final-eval-backend.onrender.com/users/register', formData);
      console.log('Register successful:', response.data);
      
      setSuccessMessage('Registration successful!');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000); 
    } catch (error) {
      console.error('Register failed:', error);
    }
  };
  
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <div>
      <h2>Register</h2>
      {successMessage && <p>{successMessage}</p>}
    <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
