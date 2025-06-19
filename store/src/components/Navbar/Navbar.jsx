import React, { useState } from "react";
import "./Navbar.css";

// SVG Icons for better control and styling
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

const Navbar = ({ onFilterChange }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // State for filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [tags, setTags] = useState("");

  // When any filter input changes, call the function from App.jsx
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    // Immediately call the parent handler
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
              <a href="#" className="nav-link">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <button
                className="nav-icon-btn"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <SearchIcon />
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
