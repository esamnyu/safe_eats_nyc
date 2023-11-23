import React from 'react';
import axios from 'axios';
import styles from '../styles/RestaurantCard.module.css';

const RestaurantCard = ({ restaurant, userId }) => {
  const formatAddress = (restaurant) => {
    // Handle missing building, street, or zipcode values
    const { building, street, zipcode } = restaurant;
    let addressParts = [];
    if (building) addressParts.push(building);
    if (street) addressParts.push(street);
    if (zipcode) {
      // Convert zipcode to integer to remove trailing .0
      const formattedZipcode = parseInt(zipcode, 10);
      addressParts.push(formattedZipcode);
    }

    return addressParts.join(' ') || 'Address not available';
  };

  const handleSubscribe = async () => {
    // Replace with the actual user ID (from context, props, etc.)
    const userIdToUse = userId || 'YourUserID';

    try {
      await axios.post('http://localhost:3001/subscribe', {
        userId: userIdToUse,
        camis: restaurant.camis
      });
      alert('Subscription successful!');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Error during subscription.');
    }
  };

  return (
    <div className={styles.card}>
      <h3>{restaurant.dba || 'Unknown Restaurant'} - {restaurant.boro || 'Unknown Location'}</h3>
      <p>Cuisine: {restaurant.cuisineDescription || 'Not specified'}</p>
      <p>Grade: {restaurant.grade || 'N/A'}</p>
      <p>Score: {restaurant.score ? restaurant.score : 'Not available'}</p>
      <p>Address: {formatAddress(restaurant)}</p>
      <p>Inspection Date: {restaurant.inspectionDate || 'Not available'}</p>
      {/* Subscription button */}
      <button onClick={handleSubscribe} className={styles.subscribeButton}>Subscribe for Updates</button>
      {/* You can add more details like violation description, etc. */}
      {/* Add more styling as needed */}
    </div>
  );
};

export default RestaurantCard;
