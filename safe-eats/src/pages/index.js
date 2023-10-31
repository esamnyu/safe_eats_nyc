import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [dataFromBackend, setDataFromBackend] = useState(null);
  const [content, setContent] = useState('');
  const [highlights, setHighlights] = useState('');

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        setDataFromBackend(response.data);
      } catch (error) {
        console.error('Error fetching data from backend: ', error);
      }
    };

    const fetchHomePageData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/homepage');
        setContent(response.data.content);
        setHighlights(response.data.highlights);
      } catch (error) {
        console.error('Error fetching homepage data: ', error);
      }
    };

    fetchDataFromBackend();
    fetchHomePageData();
  }, []);

  return (
    <div>
      <h1>Welcome to Safe Eats NYC</h1>
      <p>Learn about food safety and explore restaurant inspection results.</p>

      {/* Data from backend */}
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
