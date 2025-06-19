// src/App.jsx

import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ProductCard from "./components/ProductCard";
import "./index.css";

// --- Updated Product Data with Your Images ---

const products = [
  {
    id: 2,
    image:
      "https://mabricole.com.dz/9234-large_default/scie-circulaire-a-bois-185mm-1300w-worcraft-cs13-185.jpg",
    tags: ["Promotion", "Professionnel"],
    name: "Scie Circulaire Worcraft 185mm",
    price: "14,999",
    originalPrice: "18,500",
    currency: "DA",
    stockStatus: "En Stock",
    soldCount: 412,
  },
  {
    id: 3,
    image:
      "https://mabricole.com.dz/10325-large_default/meuleuse-angle-115mm-500w-worcraft-ag10-115s.jpg",
    tags: ["Compact", "Nouveau"],
    name: "Meuleuse d'Angle Worcraft 115mm",
    price: "8,999",
    originalPrice: "10,999",
    currency: "DA",
    stockStatus: "En Stock",
    soldCount: 295,
  },
  {
    id: 4,
    image:
      "https://mabricole.com.dz/10051-large_default/perceuse-visseuse-sans-fil-12v-avec-accessoires.jpg",
    tags: ["Sans Fil", "Kit Complet"],
    name: "Viseuse Sans Fil 12V + Kit",
    price: "11,999",
    originalPrice: "15,000",
    currency: "DA",
    stockStatus: "En Stock",
    soldCount: 689,
  },
  {
    id: 5,
    image:
      "https://mabricole.com.dz/9583-large_default/perforateur-burineur-1500w-40mm-worcraft-rh15-40x.jpg",
    tags: ["Puissant", "Usage Intensif"],
    name: "Perforateur Burineur 1500W",
    price: "24,500",
    originalPrice: "30,000",
    currency: "DA",
    stockStatus: "En Stock",
    soldCount: 118,
  },
];

// --- End of Updated Data ---

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // 3-second loading screen

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>Nos Produits</h1>
        <p>Découvrez notre sélection d'outils professionnels Worcraft.</p>
      </header>
      <main className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

export default App;
