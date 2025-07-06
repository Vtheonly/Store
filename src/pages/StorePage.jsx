// src/pages/StorePage.jsx
import React, { useState, useEffect } from "react";
import ProductRow from "../components/ProductRow/ProductRow";
import { supabase } from "../../api/supabaseClient";

const StorePage = ({ filters }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({
    newArrivals: [],
    limitedOffers: [],
    exclusives: [],
    topRated: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setAllProducts([]);
      } else {
        // --- UPDATED to derive stockStatus from stock_quantity ---
        const formattedProducts = data.map((product) => ({
          ...product,
          image: product.image_urls?.[0] || "",
          originalPrice: product.original_price,
          stockStatus: product.stock_quantity > 0 ? "En Stock" : "Épuisé",
          soldCount: product.sold_count,
          currency: "DA",
        }));
        // -----------------------

        setAllProducts(formattedProducts);
        setError(null);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let products = [...allProducts];

    // Apply filters (this logic remains the same)
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
          p.tags?.some((pt) => pt.toLowerCase().includes(st))
        )
      );
    }

    setFilteredProducts(products);

    // Categorize the filtered products
    const newArrivals = products.filter((p) =>
      p.tags?.map((t) => t.toLowerCase()).includes("nouveau")
    );
    const limitedOffers = products.filter((p) =>
      p.tags?.map((t) => t.toLowerCase()).includes("promotion")
    );
    const exclusives = products.filter((p) =>
      p.tags?.map((t) => t.toLowerCase()).includes("exclusif")
    );
    const topRated = [...products]
      .sort((a, b) => b.soldCount - a.soldCount)
      .slice(0, 15);

    setCategories({ newArrivals, limitedOffers, exclusives, topRated });
  }, [filters, allProducts]);

  if (isLoading) {
    return (
      <div className="store-container">
        <p className="no-results">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-container">
        <p className="no-results">Error: {error}</p>
      </div>
    );
  }

  const hasFilterResults = filteredProducts.length > 0;

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>Nos Produits</h1>
        <p>Découvrez notre sélection d'outils professionnels Worcraft.</p>
      </header>
      <main>
        {hasFilterResults ? (
          <>
            <ProductRow title="Tous les produits" products={filteredProducts} />
            <hr
              style={{
                border: "none",
                borderTop: "1px solid var(--border-color)",
                margin: "3rem 0",
              }}
            />
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