// File: /frontend/src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import './index.css';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState({}); // For button loading states

  // Calculate total number of items in cart
  const cartItemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await API.get('/cart');
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleAddToCart = async (productId) => {
    setLoading(prev => ({ ...prev, [productId]: true })); // Start loading
    try {
      await API.post('/cart', { productId: productId, qty: 1 });
      await fetchCart(); // Refresh cart state
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
    setLoading(prev => ({ ...prev, [productId]: false })); // Stop loading
  };

  const handleRemoveFromCart = async (itemId) => {
    setLoading(prev => ({ ...prev, [itemId]: true })); // Start loading
    try {
      await API.delete(`/cart/${itemId}`);
      await fetchCart(); // Refresh cart state
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
    // No need to stop loading, the item will disappear
  };

  const handleCheckout = async (customerData) => {
    setLoading(prev => ({ ...prev, checkout: true })); // Start checkout loading
    console.log('Checking out for:', customerData.name);
    try {
      const { data: receipt } = await API.post('/checkout');
      setReceipt(receipt); // Corrected bug here
      setShowCheckoutModal(false);
      fetchCart();
    } catch (err) {
      console.error('Checkout failed:', err);
    }
    setLoading(prev => ({ ...prev, checkout: false })); // Stop checkout loading
  };

  // --- Render Logic ---

  if (receipt) {
    return (
      <>
        <Navbar cartItemCount={0} /> {/* Show navbar on receipt page */}
        <div className="container">
          <div className="receipt-container">
            <h2>{receipt.message}</h2>
            <p>Thank you for your purchase!</p>
            <p><strong>Total Paid:</strong> ₹{receipt.total.toFixed(2)}</p>
            <p><strong>Order Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
            <button onClick={() => setReceipt(null)} className="btn-primary">
              Start New Order
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar cartItemCount={cartItemCount} />

      <div className="container">
        <main className="content">
          <div className="product-list-container">
            <h2>Products</h2>
            <ProductList
              products={products}
              onAddToCart={handleAddToCart}
              loading={loading} // Pass loading state
            />
          </div>

          <div className="cart-container">
            <h2>Your Cart</h2>
            <Cart
              cart={cart}
              onRemove={handleRemoveFromCart}
              onCheckout={() => setShowCheckoutModal(true)}
              loading={loading} // Pass loading state
            />
          </div>
        </main>
      </div>

      {showCheckoutModal && (
        <CheckoutModal
          cartTotal={cart.total}
          onClose={() => setShowCheckoutModal(false)}
          onSubmit={handleCheckout}
          loading={loading.checkout} // Pass checkout loading state
        />
      )}
    </div>
  );
}

export default App;