import React from 'react';
import styles from '../styles/ProductCard.css'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>Price: ${product.price}</span>
      {/* Add more details or actions as needed */}
    </div>
  );
};

export default ProductCard;