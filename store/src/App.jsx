// src/App.jsx

import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; // Re-add Footer
import "./index.css";
import "./components/Navbar/Navbar.css";
import "./components/Footer/Footer.css"; // Import Footer styles
import stock from "../public/data/stock.json";

const allProducts = stock;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    tags: "",
  });
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let products = [...allProducts];
    if (filters.searchTerm) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    if (filters.minPrice) {
      products = products.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      products = products.filter((p) => p.price <= Number(filters.maxPrice));
    }
    if (filters.tags) {
      const searchTags = filters.tags.toLowerCase().split(" ").filter(Boolean);
      products = products.filter((p) =>
        searchTags.every((st) =>
          p.tags.some((pt) => pt.toLowerCase().includes(st))
        )
      );
    }
    setFilteredProducts(products);
  }, [filters]);

  // Your original loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-wrapper">
      <Navbar onFilterChange={setFilters} />
      <div className="store-container">
        <header className="store-header">
          <h1>Nos Produits</h1>
          <p>Découvrez notre sélection d'outils professionnels Worcraft.</p>
        </header>
        <main className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-results">No products match your filters.</p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
