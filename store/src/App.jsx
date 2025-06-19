import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductRow from "./components/ProductRow/ProductRow"; // <-- Import new component
import "./index.css";
import "./components/Navbar/Navbar.css";
import "./components/Footer/Footer.css";
import "./components/ProductRow/ProductRow.css"; // <-- Import new CSS
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
  // State to hold categorized products
  const [categories, setCategories] = useState({
    newArrivals: [],
    limitedOffers: [],
    exclusives: [],
    topRated: [],
  });

  useEffect(() => {
    // Start with all products
    let products = [...allProducts];

    // Apply filters
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

    const newArrivals = products.filter((p) =>
      p.tags.map((t) => t.toLowerCase()).includes("nouveau")
    );
    const limitedOffers = products.filter((p) =>
      p.tags.map((t) => t.toLowerCase()).includes("promotion")
    );
    const exclusives = products.filter((p) =>
      p.tags.map((t) => t.toLowerCase()).includes("exclusif")
    );
    const topRated = [...products]
      .sort((a, b) => b.soldCount - a.soldCount)
      .slice(0, 15); // <-- CHANGED: Get top 15 best-selling items

    setCategories({ newArrivals, limitedOffers, exclusives, topRated });
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const hasProducts = Object.values(categories).some((arr) => arr.length > 0);

  return (
    <div className="app-wrapper">
      <Navbar onFilterChange={setFilters} />
      <div className="store-container">
        <header className="store-header">
          <h1>Nos Produits</h1>
          <p>Découvrez notre sélection d'outils professionnels Worcraft.</p>
        </header>
        <main>
          {hasProducts ? (
            <>
              <ProductRow
                title="Nouveautés"
                products={categories.newArrivals}
              />
              <ProductRow
                title="Offres Limitées"
                products={categories.limitedOffers}
              />
              <ProductRow title="Exclusif" products={categories.exclusives} />
              <ProductRow
                title="Les Mieux Notés"
                products={categories.topRated}
              />
            </>
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
