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
  // *** FIXED: ALL HOOKS ARE NOW AT THE TOP LEVEL, BEFORE ANY RETURNS ***
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    // This effect checks if the content is wide enough to need scrolling at all
    const el = scrollContainerRef.current;
    if (!el) return;

    const checkResize = () => {
      setCanScroll(el.scrollWidth > el.clientWidth);
      checkScrollPosition();
    };

    const observer = new ResizeObserver(checkResize);
    observer.observe(el);
    checkResize(); // Initial check

    return () => observer.disconnect();
  }, [products]); // Re-evaluate when products change

  useEffect(() => {
    // This effect adds a listener to update arrow visibility during scrolling
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition, { passive: true });
      return () => el.removeEventListener("scroll", checkScrollPosition);
    }
  }, []); // Only runs once on mount

  // *** FIXED: CONDITIONAL RETURN IS NOW AFTER ALL HOOKS HAVE BEEN CALLED ***
  if (!products || products.length === 0) {
    return null;
  }

  const checkScrollPosition = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 1;
      setIsAtStart(el.scrollLeft <= tolerance);
      setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance);
    }
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
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
