// src/pages/Home.js

import React from 'react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const products = [
    {
      id: 1,
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      price: 19.99,
      imageUrl: 'path/to/tshirt.jpg',
    },
    {
      id: 2,
      name: 'Jeans',
      description: 'Classic blue jeans',
      price: 39.99,
      imageUrl: 'path/to/jeans.jpg',
    },
    {
        id: 3,
        name: 'Jeans',
        description: 'Classic blue jeans',
        price: 39.99,
        imageUrl: 'path/to/jeans.jpg',
      },
    // Add more products as needed
  ];

  return (
    <div className="home-page">
      <h1>Welcome to our Store!</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
