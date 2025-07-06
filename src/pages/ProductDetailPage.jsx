// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../api/supabaseClient"; // <-- IMPORT SUPABASE CLIENT

// (Keep the WhatsAppIcon component as it is)
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setIsLoading(true);
      // Fetch a SINGLE product where the 'id' column matches productId
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single(); // .single() is key here!

      if (error) {
        console.error("Error fetching product:", error);
        setError(true);
        setProduct(null);
      } else {
        setProduct(data);
        // 'image_urls' is the column name in our database
        setActiveImage(data.image_urls ? data.image_urls[0] : "");
        setError(false);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]); // Re-run this effect if the productId changes

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
              <h3>Spécifications</h3>
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

          {product.whatsapp_number && (
            <div className="product-detail-actions">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon />
                Contacter sur WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;