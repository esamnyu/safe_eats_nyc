import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import Login from '../components/Login';
import Register from '../components/Register';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage && !isTokenExpired(tokenFromStorage)) {
      setToken(tokenFromStorage);
    } else {
      localStorage.removeItem('token'); // Clear expired token
    }
  }, []);

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (e) {
      return true;
    }
  };

  if (!token) {
    return (
      <div>
        <Register />
        <Login setToken={setToken} />
      </div>
    );
  }

  return <HomePage />;
};

export default App;
