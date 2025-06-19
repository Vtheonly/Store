// src/components/Navbar/Navbar.jsx

import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Import context
import "./Navbar.css";

// Icons
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
);
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
  </svg>
);
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
  </svg>
);

const Navbar = ({ onFilterChange }) => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use the context
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [tags, setTags] = useState("");

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    onFilterChange({
      searchTerm: e.target.name === "searchTerm" ? e.target.value : searchTerm,
      minPrice: e.target.name === "minPrice" ? e.target.value : minPrice,
      maxPrice: e.target.name === "maxPrice" ? e.target.value : maxPrice,
      tags: e.target.name === "tags" ? e.target.value : tags,
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            WORCRAFT
          </a>
          <ul className="nav-menu">
            <li className="nav-item">
              <button
                className="nav-icon-btn"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                title="Search"
              >
                <SearchIcon />
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-icon-btn"
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`search-bar-container ${isSearchVisible ? "visible" : ""}`}
      >
        {/* Search bar JSX remains the same */}
        <div className="search-bar">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search for a product..."
            className="search-input"
            value={searchTerm}
            onChange={handleInputChange(setSearchTerm)}
          />
          <button
            className="filter-btn"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <FilterIcon />
            <span>Filters</span>
          </button>
        </div>
        <div className={`advanced-filters ${isFilterVisible ? "visible" : ""}`}>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price (DA)"
            className="filter-input"
            value={minPrice}
            onChange={handleInputChange(setMinPrice)}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price (DA)"
            className="filter-input"
            value={maxPrice}
            onChange={handleInputChange(setMaxPrice)}
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (e.g. kit puissant)"
            className="filter-input tags-input"
            value={tags}
            onChange={handleInputChange(setTags)}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
