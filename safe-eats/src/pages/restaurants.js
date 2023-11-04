import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import styles from './RestaurantsPage.module.css'; // Assuming you have a CSS module for this page

const RestaurantsPage = () => {
  // ... (rest of the state and effect code remains unchanged)

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
        <div className={styles.cardsContainer}> {/* Modified this line to use CSS Modules */}
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              // Removed the wrapping div, RestaurantCard should handle its own styling
              <RestaurantCard restaurant={restaurant} key={restaurant.camis} />
            ))
          ) : (
            <p>No restaurants found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
