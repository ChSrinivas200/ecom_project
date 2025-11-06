import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

// Receive the 'loading' state as a prop
export default function CheckoutModal({ cartTotal, onClose, onSubmit, loading }) {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-modal-btn">&times;</button>
        <h2>Checkout</h2>
        <p>You are about to purchase items totaling <strong>₹{cartTotal.toFixed(2)}</strong>.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <FaSpinner className="spinner" />
              ) : (
                'Confirm Purchase'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}