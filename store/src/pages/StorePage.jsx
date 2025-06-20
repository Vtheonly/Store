// src/pages/StorePage.jsx
import React, { useState, useEffect } from "react";
import ProductRow from "../components/ProductRow/ProductRow";
import stock from "../../public/data/stock.json";

const allProducts = stock;

const StorePage = ({ filters }) => {
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
      .slice(0, 15);

    setCategories({ newArrivals, limitedOffers, exclusives, topRated });
  }, [filters]);

  const hasProducts = Object.values(categories).some((arr) => arr.length > 0);

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>Nos Produits</h1>
        <p>Découvrez notre sélection d'outils professionnels Worcraft.</p>
      </header>
      <main>
        {hasProducts ? (
          <>
            <ProductRow title="Nouveautés" products={categories.newArrivals} />
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
  );
};

export default StorePage;
