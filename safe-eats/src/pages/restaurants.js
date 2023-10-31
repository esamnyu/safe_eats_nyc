import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/search?query=${searchTerm}`);
        setRestaurants(response.data.results);
      } catch (error) {
        console.error('Error fetching restaurants from backend: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
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
              <li key={restaurant.id}>{restaurant.name}</li>
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
