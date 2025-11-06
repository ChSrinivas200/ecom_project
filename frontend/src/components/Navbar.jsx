import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css'; // We'll create this CSS file next

export default function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">RVR ecomerce</h1>
        <div className="cart-icon-wrapper">
          <FaShoppingCart size={24} />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </div>
      </div>
    </nav>
  );
}