// src/components/FloatingCart/FloatingCart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import Icon from '../Icons/Icon';
import './FloatingCart.css';

const FloatingCart = () => {
  const {
    items,
    isOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    let message = "Bonjour, je souhaite commander les produits suivants:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantité: ${item.quantity}\n`;
      message += `   Prix unitaire: ${item.price} ${item.currency}\n`;
      message += `   Sous-total: ${formatPrice(item.price * item.quantity)} ${item.currency}\n\n`;
    });

    message += `Total: ${formatPrice(getTotalPrice())} DH\n\n`;
    message += "Merci de me confirmer la disponibilité et les détails de livraison.";

    // You can customize this number or make it dynamic
    const whatsappNumber = "212600000000"; // Replace with actual number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <div className={`cart-toggle ${getTotalItems() > 0 ? 'has-items' : ''}`} onClick={toggleCart}>
        <Icon name="ShoppingCart" size={24} color="white" />
        {getTotalItems() > 0 && (
          <span className="cart-badge">{getTotalItems()}</span>
        )}
      </div>

      {/* Cart Overlay */}
      {isOpen && <div className="cart-overlay" onClick={toggleCart}></div>}

      {/* Cart Panel */}
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Mon Panier</h3>
          <button className="cart-close" onClick={toggleCart}>
            <Icon name="Close" size={20} />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Votre panier est vide</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">
                        {item.price} {item.currency}
                      </p>
                      <div className="cart-item-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: {formatPrice(getTotalPrice())} DH</strong>
                </div>
                <div className="cart-actions">
                  <button className="btn btn-clear" onClick={clearCart}>
                    Vider le panier
                  </button>
                  <button className="btn btn-whatsapp" onClick={handleWhatsAppOrder}>
                    <Icon name="MessageCircle" size={16} color="white" />
                    Commander
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingCart;