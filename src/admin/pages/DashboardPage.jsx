// src/admin/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../api/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } else {
      setProducts(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (deleteError) {
        console.error("Error deleting product:", deleteError);
        setFeedback({
          type: "error",
          message: `Failed to delete product: ${deleteError.message}`,
        });
      } else {
        setProducts(products.filter((p) => p.id !== productId));
        setFeedback({
          type: "success",
          message: "Product deleted successfully.",
        });
      }
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
      setFeedback({ type: "error", message: "Failed to log out." });
    } else {
      navigate("/admin/login");
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-header-actions">
          <Link to="/admin/add-product" className="btn btn-reel">
            + ADD NEW PRODUCT
          </Link>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      {feedback && (
        <p className={`feedback ${feedback.type}-feedback`}>
          {feedback.message}
        </p>
      )}
      {error && <p className="feedback error-feedback">Error: {error}</p>}

      <div className="product-list-container">
        <div className="product-list-header">
          <div className="col-image">Image</div>
          <div className="col-name">Name</div>
          <div className="col-stock">Stock</div>
          <div className="col-price">Price (DA)</div>
          <div className="col-actions">Actions</div>
        </div>
        <div className="product-list-body">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-list-row" key={product.id}>
                <div className="col-image">
                  <img
                    src={
                      product.image_urls?.[0] ||
                      "https://via.placeholder.com/60"
                    }
                    alt={product.name}
                    className="table-product-image"
                  />
                </div>
                <div className="col-name">{product.name}</div>
                <div className="col-stock">{product.stock_quantity ?? 0}</div>
                <div className="col-price">{product.price}</div>
                <div className="col-actions actions-cell">
                  <Link
                    to={`/admin/edit-product/${product.id}`}
                    className="btn-edit-text"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products-cell">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;