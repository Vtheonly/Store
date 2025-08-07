// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import dataService from "../services/dataService";
import Reviews from "../components/Reviews/Reviews";
import { useCart } from "../components/context/CartContext";
import Icon from "../components/Icons/Icon";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setIsLoading(true);
      
      try {
        const { data, error } = await dataService.fetchProductById(productId);

        if (error) {
          console.error("Error fetching product:", error);
          setError(true);
          setProduct(null);
        } else {
          setProduct(data);
          setActiveImage(data.image_urls ? data.image_urls[0] : "");
          setError(false);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError(true);
        setProduct(null);
      }
      
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    // You can use the existing spinner CSS here if you want
    return (
      <div className="store-container">
        <p className="no-results">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="store-container">
        <div className="no-results" style={{ padding: "6rem 0" }}>
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link
            to="/"
            className="btn btn-reel"
            style={{ marginTop: "2rem", maxWidth: "200px" }}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }
  
  // NOTE: 'whatsapp_number' is the column name in the database
  const whatsappMessage = `Bonjour, je suis intéressé par le produit: ${product.name} (ID: ${product.id}).`;
  const whatsappLink = `https://wa.me/${
    product.whatsapp_number
  }?text=${encodeURIComponent(whatsappMessage)}`;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image_urls ? product.image_urls[0] : "",
    });
  };

  return (
    <div className="store-container product-detail-container">
      <div className="product-detail-layout">
        {/* Left Column: Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <img src={activeImage} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-list">
             {/* Use 'image_urls' from the database */}
            {product.image_urls &&
              product.image_urls.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail-item ${
                    img === activeImage ? "active" : ""
                  }`}
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="product-content">
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div
            className="product-price"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <span className="current-price">
              {product.price} {product.currency}
            </span>
            {product.original_price && (
              <span className="original-price">
                {product.original_price} {product.currency}
              </span>
            )}
          </div>

          {product.description && (
            <div className="product-detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {product.specifications && (
            <div className="product-specifications">
              <h3>Caractéristiques</h3>
              <table className="spec-table">
                <tbody>
                  {product.specifications.map((spec) => (
                    <tr key={spec.label}>
                      <td>{spec.label}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="product-detail-actions">
            <button className="btn btn-reel" onClick={handleAddToCart}>
              <Icon name="Download" size={16} color="white" />
              Ajouter au Panier
            </button>
            {product.whatsapp_number && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <Icon name="MessageCircle" size={20} color="white" />
                Contacter sur WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <Reviews productId={productId} />
    </div>
  );
};

export default ProductDetailPage;