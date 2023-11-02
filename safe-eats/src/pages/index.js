import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Search from '../components/Search';

const HomePage = () => {
  const [dataFromBackend, setDataFromBackend] = useState(null);
  const [content, setContent] = useState('');
  const [highlights, setHighlights] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3001/'); // Updated to correct backend port
        setDataFromBackend(response.data);
      } catch (error) {
        console.error('Error fetching data from backend: ', error);
      }
    };

    // Fetch educational content and highlights
    const fetchHomePageData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/homepage'); // Updated to correct backend port
        setContent(response.data.content);
        setHighlights(response.data.highlights);
      } catch (error) {
        console.error('Error fetching homepage data: ', error);
      }
    };

    fetchDataFromBackend();
    fetchHomePageData();
  }, []);

  const onResults = (newResults) => {
    setSearchResults(newResults);
  };

  return (
    <div>
      <h1>Welcome to Safe Eats NYC</h1>
      <p>Learn about food safety and explore restaurant inspection results.</p>

      {/* Search Component */}
      <Search onResults={onResults} />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.dba}</li> // Updated to display the restaurant's name
            ))}
          </ul>
        </section>
      )}

      {/* Data from Backend */}
      {dataFromBackend ? (
        <div>
          <h2>Data from Backend:</h2>
          <pre>{JSON.stringify(dataFromBackend, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading data from backend...</p>
      )}

      {/* Educational Content and Highlights */}
      <section>
        <h2>Educational Content</h2>
        <p>{content || 'Loading content...'}</p>
      </section>
      <section>
        <h2>Common Inspection Issues</h2>
        <p>{highlights || 'Loading highlights...'}</p>
      </section>
    </div>
  );
};

export default HomePage;
