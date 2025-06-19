// src/App.jsx

import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import ProductCard from './components/ProductCard';
import './index.css';

// --- Updated Product Data with Your Images ---
const products = [
  {
    id: 1,
    image: 'https://gamaoutillage.net/wp-content/uploads/2021/07/CHD-S20Li-GAMAOUTILLAGE-CNC-2.jpg',
    tags: ['Sans Fil', 'Professionnel', 'Bestseller'],
    name: 'Perceuse Sans Fil Worcraft 20V',
    price: '22,499',
    originalPrice: '29,999',
    currency: 'DA',
    stockStatus: 'En Stock',
    soldCount: 847,
  },
  {
    id: 2,
    image: 'https://mabricole.com.dz/9234-large_default/scie-circulaire-a-bois-185mm-1300w-worcraft-cs13-185.jpg',
    tags: ['Promotion', 'Professionnel'],
    name: 'Scie Circulaire Worcraft 185mm',
    price: '14,999',
    originalPrice: '18,500',
    currency: 'DA',
    stockStatus: 'En Stock',
    soldCount: 412,
  },
];
// --- End of Updated Data ---

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second loading screen

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
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

export default App;