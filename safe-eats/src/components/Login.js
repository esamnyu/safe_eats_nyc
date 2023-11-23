import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/RestaurantCard.module.css';

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', credentials);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        <label>Password:</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
