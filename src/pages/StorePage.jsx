// src/pages/StorePage.jsx
import React, { useState, useEffect } from "react";
import ProductRow from "../components/ProductRow/ProductRow";
import dataService from "../services/dataService";
import { Sparkles, TrendingUp, Star, Trophy, IconWrapper } from "../components/icons";
import TitleWithIcon from "../components/TitleWithIcon/TitleWithIcon";

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
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await dataService.fetchProducts();

        if (error) {
          console.error("Error fetching products:", error);
          setError(error.message);
          setAllProducts([]);
        } else {
          // Format products consistently for both mock and real data
          const formattedProducts = data.map((product) => ({
            ...product,
            image: product.image_urls?.[0] || product.image || "",
            originalPrice: product.original_price,
            stockStatus: product.stock_quantity > 0 ? "En Stock" : "Épuisé",
            soldCount: product.sold_count,
            currency: product.currency || "DA",
          }));

          setAllProducts(formattedProducts);
          setError(null);
        }
        
        // Update mock data indicator
        setIsUsingMockData(dataService.isUsingMockData());
        
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to load products");
        setAllProducts([]);
      }
      
      // Add a small delay for better UX - let users see the loading skeleton
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let products = [...allProducts];

    // Apply search filter
    if (filters.searchTerm) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply price filters
    if (filters.minPrice) {
      products = products.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      products = products.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Apply category filter
    if (filters.category) {
      products = products.filter((p) =>
        p.tags?.some((tag) => tag.toLowerCase().includes(filters.category.toLowerCase()))
      );
    }

    // Apply brand filter
    if (filters.brand) {
      products = products.filter((p) =>
        p.tags?.some((tag) => tag.toLowerCase().includes(filters.brand.toLowerCase())) ||
        p.name.toLowerCase().includes(filters.brand.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Apply custom tags filter
    if (filters.tags) {
      const searchTags = filters.tags.toLowerCase().split(" ").filter(Boolean);
      products = products.filter((p) =>
        searchTags.every((st) =>
          p.tags?.some((pt) => pt.toLowerCase().includes(st)) ||
          p.name.toLowerCase().includes(st) ||
          p.description.toLowerCase().includes(st)
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
        <main>
          {/* Loading skeleton for multiple product rows */}
          {[...Array(4)].map((_, rowIndex) => (
            <section key={rowIndex} className="product-row-container">
              <div className="loading-shimmer loading-row-title"></div>
              <div className="product-row-wrapper">
                <div className="product-row-scroll">
                  {[...Array(6)].map((_, cardIndex) => (
                    <div key={cardIndex} className="loading-card">
                      <div className="loading-shimmer loading-image"></div>
                      <div className="loading-content">
                        <div className="loading-shimmer loading-title"></div>
                        <div className="loading-shimmer loading-price"></div>
                        <div className="loading-shimmer loading-tags"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </main>
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
            <ProductRow 
              title={<TitleWithIcon icon={Sparkles} iconColor="#667eea">Nouveautés</TitleWithIcon>} 
              products={categories.newArrivals} 
            />
            <ProductRow
              title={<TitleWithIcon icon={TrendingUp} iconColor="#ff6b6b">Offres Spéciales</TitleWithIcon>}
              products={categories.limitedOffers}
            />
            <ProductRow 
              title={<TitleWithIcon icon={Star} iconColor="#ffd700">Collection Premium</TitleWithIcon>} 
              products={categories.exclusives} 
            />
            <ProductRow
              title={<TitleWithIcon icon={Trophy} iconColor="#ff8c00">Les Plus Populaires</TitleWithIcon>}
              products={categories.topRated}
            />
          </>
        ) : (
          <div className="no-results">
            <h3>Aucun produit trouvé</h3>
            <p>Essayez de modifier vos filtres ou votre recherche.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StorePage;