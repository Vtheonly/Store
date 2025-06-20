// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ProductCard({ product }) {
  const navigate = useNavigate(); // Initialize the navigate function
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

  // This function will be called when the button is clicked
  const handleInspectClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        <div className="product-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
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
            Inspecter
          </button>
          <button className="btn btn-reel">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
            </svg>
            Regarder Reel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
