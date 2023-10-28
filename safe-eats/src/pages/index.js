import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome to Safe Eats NYC</h1>
        <p className="my-4">
          Discover the food safety ratings of restaurants in New York City. Learn about common violations and how to ensure the food you are eating is safe.
        </p>
        <div className="my-4">
          <Link href="/restaurants" passHref>
            <button className="bg-blue-500 text-white px-4 py-2 rounded block text-center">Search for Restaurants</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
