import React, { useState } from 'react';

const Restaurants = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockRestaurants = [
    { id: 1, name: 'Pizza Place', address: '123 Main St' },
    { id: 2, name: 'Burger Joint', address: '456 Side St' },
    { id: 3, name: 'Sushi Spot', address: '789 Ocean Ave' },
  ];

  const handleSearch = () => {
    setIsLoading(true);
    setError(null);
    
    // Here you would make a call to your backend API to fetch the restaurant data
    // For demonstration purposes, we're using a timeout to simulate a network request
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real-world scenario, you would set the results based on the API response
      // For now, we're just setting it to the mock data
      setResults(mockRestaurants);
    }, 1000);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Restaurant Search</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a restaurant..."
          className="border p-2 flex-grow"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((restaurant) => (
              <li key={restaurant.id} className="mb-4">
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <p>{restaurant.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
