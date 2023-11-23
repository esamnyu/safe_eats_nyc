import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import Login from '../components/Login'; // Adjust the import path if necessary
import Register from '../components/Register'; // Adjust the import path if necessary

const App = () => {
  const [token, setToken] = useState(null);

  // useEffect to mimic componentDidMount for client-side operations
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

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
