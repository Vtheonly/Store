// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StorePage from "./pages/StorePage"; // New Page Component
import ProductDetailPage from "./pages/ProductDetailPage"; // New Page Component
import "./index.css";
import "./components/Navbar/Navbar.css";
import "./components/Footer/Footer.css";
import "./components/ProductRow/ProductRow.css";
import "./pages/ProductDetailPage.css"; // Import new CSS for detail page

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    tags: "",
  });

  // Keep loading screen logic in the main App component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Reduced time for better UX

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // The main layout with Navbar and Footer, wrapping the pages
  return (
    <div className="app-wrapper">
      <Navbar onFilterChange={setFilters} />
      <Routes>
        <Route path="/" element={<StorePage filters={filters} />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
