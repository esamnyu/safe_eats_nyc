import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (searchTerm.trim() !== '') {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3001/search?query=${searchTerm}`);
          setRestaurants(response.data.results);
        } catch (error) {
          console.error('Error fetching restaurants from backend: ', error);
          setRestaurants([]);
        } finally {
          setLoading(false);
        }
      } else {
        setRestaurants([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchRestaurants();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Restaurants</h1>
      <p>Find restaurant inspection results and make informed dining choices.</p>

      <input
        type="text"
        placeholder="Search for a restaurant"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading restaurants...</p>
      ) : (
        <ul>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <li key={restaurant.camis}>
                <h3>{restaurant.dba} - {restaurant.boro}</h3>
                <p>{restaurant.cuisineDescription}</p>
                <p>Grade: {restaurant.grade || 'N/A'}</p>
                <p>Score: {restaurant.score}</p>
              </li>
            ))
          ) : (
            <p>No restaurants found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default RestaurantsPage;
