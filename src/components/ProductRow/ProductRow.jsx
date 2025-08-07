// src/components/ProductRow/ProductRow.jsx
import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import Icon from "../Icons/Icon";

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
            <Icon name="ChevronLeft" size={24} />
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
            <Icon name="ChevronRight" size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductRow;
