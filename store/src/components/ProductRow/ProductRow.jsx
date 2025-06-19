// src/components/ProductRow/ProductRow.jsx
import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ProductCard";

// Self-contained SVG icons for the arrows
const LeftArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

const ProductRow = ({ title, products }) => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  // If there are no products, don't render the row.
  if (!products || products.length === 0) {
    return null;
  }

  // This effect checks if the row is at the beginning or end of its scroll
  const checkScrollPosition = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 1;
      setIsAtStart(el.scrollLeft <= tolerance);
      setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance);
    }
  };

  // This effect checks if the content is wide enough to need scrolling at all
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setCanScroll(el.scrollWidth > el.clientWidth);
      checkScrollPosition();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [products]); // Re-evaluate when products change

  // This effect adds a listener to update arrow visibility during scrolling
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      return () => el.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      // Scroll by 80% of the visible width for a pleasant experience
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="product-row-container">
      <h2 className="product-row-title">{title}</h2>
      <div className="product-row-wrapper">
        {canScroll && !isAtStart && (
          <button
            className="scroll-arrow prev"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <LeftArrowIcon />
          </button>
        )}
        <div className="product-row-scroll" ref={scrollContainerRef}>
          {products.map((product) => (
            <ProductCard key={`${title}-${product.id}`} product={product} />
          ))}
        </div>
        {canScroll && !isAtEnd && (
          <button
            className="scroll-arrow next"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <RightArrowIcon />
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductRow;
