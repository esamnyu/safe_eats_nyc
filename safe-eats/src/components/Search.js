import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/search`, { params: { query } });
      onResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results: ', error);
      onResults([]);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search for a restaurant" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
