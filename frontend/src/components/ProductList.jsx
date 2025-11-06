// File: /frontend/src/components/ProductList.jsx

import { FaSpinner } from 'react-icons/fa';

export default function ProductList({ products, onAddToCart, loading }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-image" 
          />
          
          <h3>{product.name}</h3>
          <p>₹{product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product.id)}
            disabled={loading[product.id]}
            className="btn-primary"
          >
            {loading[product.id] ? (
              <FaSpinner className="spinner" />
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      ))}
    </div>
  );
}