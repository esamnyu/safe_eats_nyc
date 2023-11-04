import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import RestaurantCard from '../components/RestaurantCard'; // Correct path assuming index.js is in the pages directory

const HomePage = () => {
  const [dataFromBackend, setDataFromBackend] = useState(null);
  const [content, setContent] = useState('');
  const [highlights, setHighlights] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [uniqueSearchResults, setUniqueSearchResults] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3001/');
        setDataFromBackend(response.data);
      } catch (error) {
        console.error('Error fetching data from backend: ', error);
      }
    };

    // Fetch educational content and highlights
    const fetchHomePageData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/homepage');
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
    // Filter out duplicates based on 'camis' and update the state
    const uniqueResults = newResults.reduce((acc, current) => {
      const x = acc.find(item => item.camis === current.camis);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setUniqueSearchResults(uniqueResults);
  };

  return (
    <div>
      <h1>Welcome to Safe Eats NYC</h1>
      <p>Learn about food safety and explore restaurant inspection results.</p>

      {/* Search Component */}
      <Search onResults={onResults} />

      {/* Search Results */}
      {uniqueSearchResults.length > 0 && (
        <section>
          <h2>Search Results</h2>
              <div className="cards-container">
                {uniqueSearchResults.map((result) => (
                  <RestaurantCard key={result.camis} restaurant={result} />
                ))}
              </div>

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
