import React from 'react';
import axios from 'axios';
import styles from '../styles/RestaurantCard.module.css';

const RestaurantCard = ({ restaurant, userid }) => {
  const formatAddress = (restaurant) => {
    const { building, street, zipcode } = restaurant;
    let addressParts = [];
    if (building) addressParts.push(building);
    if (street) addressParts.push(street);
    if (zipcode) {
      const formattedZipcode = parseInt(zipcode, 10);
      addressParts.push(formattedZipcode);
    }
    return addressParts.join(' ') || 'Address not available';
  };

  const handleSubscribe = async () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to subscribe.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/subscribe',
        { userid: userid, camis: restaurant.camis },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data); // Log the successful response from the server
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
      <button onClick={handleSubscribe} className={styles.subscribeButton}>Subscribe for Updates</button>
    </div>
  );
};

export default RestaurantCard;
