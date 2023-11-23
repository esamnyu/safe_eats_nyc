import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from '../components/Search';
import RestaurantCard from '../components/RestaurantCard';
import styles from '../styles/RestaurantCard.module.css';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

// Dynamically import MapView with SSR disabled
// const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

const HomePage = () => {
  const [dataFromBackend, setDataFromBackend] = useState(null);
  const [content, setContent] = useState('');
  const [highlights, setHighlights] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter(); // Initialize the Next.js router

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [backendData, homePageData] = await Promise.all([
          axios.get('http://localhost:3001/'),
          axios.get('http://localhost:3001/homepage')
        ]);
        setDataFromBackend(backendData.data);
        setContent(homePageData.data.content);
        setHighlights(homePageData.data.highlights);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onResults = (newResults) => {
    const uniqueResults = newResults.reduce((acc, current) => {
      if (!acc.some(item => item.camis === current.camis)) {
        acc.push(current);
      }
      return acc;
    }, []);
    setSearchResults(uniqueResults);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/Login'); // Replace '/login' with the path to your login page if different
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <h1>Welcome to Safe Eats NYC</h1>
      <p>Learn about food safety and explore restaurant inspection results.</p>

      <Search onResults={onResults} />

      {searchResults.length > 0 && (
        <>
          <section>
            <h2>Search Results</h2>
            <div className={styles.cardsContainer}>
              {searchResults.map((result) => (
                <RestaurantCard key={result.camis} restaurant={result} />
              ))}
            </div>
          </section>

          {/* MapView Component */}
          {/* <section>
            <MapView restaurants={searchResults} />
          </section> */}
        </>
      )}

      <section>
        <h2>Data from Backend:</h2>
        <pre>{JSON.stringify(dataFromBackend, null, 2)}</pre>
      </section>

      <section>
        <h2>Educational Content</h2>
        <p>{content}</p>
      </section>

      <section>
        <h2>Common Inspection Issues</h2>
        <p>{highlights}</p>
      </section>
    </div>
  );
};

export default HomePage;
