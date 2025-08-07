// src/components/Navbar/Navbar.jsx

import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Icon from "../Icons/Icon";
import "./Navbar.css";

const Navbar = ({ onFilterChange }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // *** FIXED: Use a single state object for all local filters ***
  const [localFilters, setLocalFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    tags: "",
    category: "",
    brand: "",
  });

  // *** FIXED: This effect will watch for changes in localFilters and call the parent prop ***
  // This avoids the stale state issue and ensures the parent always gets the complete, updated filter object.
  useEffect(() => {
    // We use a debounce to avoid sending too many requests while the user is typing.
    const handler = setTimeout(() => {
      onFilterChange(localFilters);
    }, 300); // Wait 300ms after the user stops typing

    // Cleanup function to cancel the timeout if the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [localFilters, onFilterChange]);

  // *** FIXED: A single, simplified handler for all inputs ***
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            StyleShop
          </a>
          <ul className="nav-menu">
            <li className="nav-item info-item">
              <div className="info-rectangle"></div>
              <a href="/info" className="nav-link">
                <span>Informations</span>
              </a>
            </li>
            <li className="nav-item">
              <button
                className="nav-icon-btn"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                title="Search"
              >
                <Icon name="Search" size={20} />
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-icon-btn"
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                <Icon name={theme === "light" ? "Moon" : "Sun"} size={20} />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`search-bar-container ${isSearchVisible ? "visible" : ""}`}
      >
        <div className="search-bar">
          <input
            type="text"
            name="searchTerm"
            placeholder="Rechercher un produit..."
            className="search-input"
            value={localFilters.searchTerm} // Use state object
            onChange={handleInputChange} // Use single handler
          />
          <button
            className="filter-btn"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Icon name="Filter" size={20} />
            <span>Filters</span>
          </button>
        </div>
        <div className={`advanced-filters ${isFilterVisible ? "visible" : ""}`}>
          <div className="filter-row">
            <input
              type="number"
              name="minPrice"
              placeholder="Prix Min (DA)"
              className="filter-input"
              value={localFilters.minPrice}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Prix Max (DA)"
              className="filter-input"
              value={localFilters.maxPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-row">
            <select
              name="category"
              className="filter-input"
              value={localFilters.category || ""}
              onChange={handleInputChange}
            >
              <option value="">Toutes les catégories</option>
              <option value="vêtements">Vêtements</option>
              <option value="chaussures">Chaussures</option>
              <option value="montres">Montres</option>
              <option value="t-shirt">T-Shirts</option>
              <option value="chemise">Chemises</option>
              <option value="pantalon">Pantalons</option>
              <option value="veste">Vestes</option>
              <option value="sneakers">Sneakers</option>
              <option value="boots">Boots</option>
            </select>
            <select
              name="brand"
              className="filter-input"
              value={localFilters.brand || ""}
              onChange={handleInputChange}
            >
              <option value="">Toutes les marques</option>
              <option value="premium">Premium</option>
              <option value="classic">Classic</option>
              <option value="urban">Urban</option>
              <option value="sport">Sport</option>
              <option value="elegant">Elegant</option>
              <option value="casual">Casual</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <input
            type="text"
            name="tags"
            placeholder="Tags personnalisés (ex: premium, tendance, confort)"
            className="filter-input tags-input"
            value={localFilters.tags}
            onChange={handleInputChange}
          />
          <div className="filter-actions">
            <button
              type="button"
              className="clear-filters-btn"
              onClick={() => setLocalFilters({
                searchTerm: "",
                minPrice: "",
                maxPrice: "",
                tags: "",
                category: "",
                brand: "",
              })}
            >
              Effacer les filtres
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
