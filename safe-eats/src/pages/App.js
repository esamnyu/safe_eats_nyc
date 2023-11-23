import React, { useState } from 'react';
import HomePage from './HomePage';
import Login from './Login'; // Import the Login component
import Register from './Register'; // Import the Register component

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return (
      <div>
        <Register />
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <HomePage />
  );
};

export default App;
