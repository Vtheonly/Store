// src/components/ProductCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const {
    id,
    image,
    tags,
    name,
    price,
    originalPrice,
    currency,
    stockStatus,
    soldCount,
  } = product;

  const handleInspectClick = () => {
    navigate(`/product/${id}`);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      currency,
      image,
    });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {!isImageLoaded && (
          <div className="loading-shimmer" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
        )}
        <img 
          src={image} 
          alt={name} 
          className={`product-image ${isImageLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="product-tags">
          {tags && tags.map((tag, index) => (
            <span key={tag} className="tag" style={{ animationDelay: `${index * 0.1}s` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="product-info">
        <h2 className="product-name">{name}</h2>

        <div className="product-price">
          <span className="current-price">
            {price} {currency}
          </span>
          {originalPrice && (
            <span className="original-price">
              {originalPrice} {currency}
            </span>
          )}
        </div>

        <div className="product-meta">
          <span className="stock-status">
            <span className="dot green-dot"></span> {stockStatus}
          </span>
          <span className="sold-count">
            <span className="dot blue-dot"></span> {soldCount} vendus
          </span>
        </div>

        <div className="product-actions">
          {/* Reverted to a <button> and added the onClick handler */}
          <button className="btn btn-inspect" onClick={handleInspectClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.816 1.221-2.25 2.53-4.135 3.431C8.834 12.338 7.07 12.5 5.09 12.06A13.132 13.132 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
            Voir Détails
          </button>
          <button className="btn btn-reel" onClick={handleAddToCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Ajouter au Panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
