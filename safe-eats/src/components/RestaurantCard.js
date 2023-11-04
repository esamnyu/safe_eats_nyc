// File: components/RestaurantCard.js

import React from 'react';
import styles from '../styles/RestaurantCard.module.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className={styles.card}>
      <h3>{restaurant.dba} - {restaurant.boro}</h3>
      <p>Cuisine: {restaurant.cuisineDescription}</p>
      <p>Grade: {restaurant.grade || 'N/A'}</p>
      <p>Score: {restaurant.score}</p>
      {/* Add more details and styling as needed */}
    </div>
  );
};

export default RestaurantCard;
