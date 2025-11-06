import { FaTrash, FaShoppingCart } from 'react-icons/fa';

export default function Cart({ cart, onRemove, onCheckout, loading }) {
  return (
    <div className="cart-summary">
      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <FaShoppingCart size={48} />
          <p>Your cart is empty.</p>
          <span>Add products to get started!</span>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cart.items.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    {/* Changed $ to ₹ */}
                    {item.quantity} x ₹{item.price.toFixed(2)}
                  </span>
                </div>
                <span className="cart-item-total">
                  {/* Changed $ to ₹ */}
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => onRemove(item._id)}
                  className="remove-btn"
                  disabled={loading[item._id]}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total-section">
            <h3>Total:</h3>
            {/* Changed $ to ₹ */}
            <span>₹{cart.total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="checkout-btn btn-primary"
            disabled={cart.items.length === 0}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}