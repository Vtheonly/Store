// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StorePage from "./pages/StorePage";
import ProductDetailPage from "./pages/ProductDetailPage";

// Admin Imports
import AdminLoginPage from "./admin/pages/AdminLoginPage.jsx";
import ProtectedRoute from "./admin/pages/components/ProtectedRoute.jsx";
import AddProductPage from "./admin/pages/AddProductPage.jsx";
import EditProductPage from "./admin/pages/EditProductPage.jsx";
import DashboardPage from "./admin/pages/DashboardPage.jsx";

import "./index.css";
import "./components/Navbar/Navbar.css";
import "./components/Footer/Footer.css";
import "./components/ProductRow/ProductRow.css";
import "./pages/ProductDetailPage.css";
import "./admin/pages/AddProductPage.css";
import "./admin/pages/DashboardPage.css";
import "./admin/pages/AdminLoginPage.css"; // <-- Import new CSS

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    tags: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-wrapper">
      <Navbar onFilterChange={setFilters} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StorePage filters={filters} />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/admin/edit-product/:productId" element={<EditProductPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
