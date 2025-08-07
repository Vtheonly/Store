// src/services/mockDataProvider.js

/**
 * Mock data provider for StyleShop Men's Clothing Store application
 * Provides realistic clothing and accessories products when database is unavailable
 */

const mockProducts = [
  {
    id: "1",
    name: "T-Shirt Premium Coton Bio",
    description:
      "T-shirt premium en coton biologique 100%. Coupe moderne et confortable, parfait pour un look décontracté. Disponible en plusieurs coloris tendance.",
    price: 2500,
    original_price: 3200,
    tags: ["Nouveau", "Promotion", "T-shirt", "Coton"],
    stock_quantity: 45,
    sold_count: 128,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "100% Coton Bio" },
      { label: "Coupe", value: "Regular Fit" },
      { label: "Col", value: "Rond" },
      { label: "Entretien", value: "Lavage 30°C" },
      { label: "Origine", value: "Made in Turkey" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Chemise Oxford Classique",
    description:
      "Chemise Oxford en coton de qualité supérieure. Coupe ajustée, col boutonné et finitions soignées. Idéale pour le bureau ou les occasions formelles.",
    price: 4800,
    original_price: null,
    tags: ["Chemise", "Oxford", "Classique"],
    stock_quantity: 32,
    sold_count: 89,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "100% Coton Oxford" },
      { label: "Coupe", value: "Slim Fit" },
      { label: "Col", value: "Boutonné" },
      { label: "Manches", value: "Longues" },
      { label: "Tailles", value: "S à XXL" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    name: "Jean Slim Stretch Indigo",
    description:
      "Jean slim en denim stretch de haute qualité. Coupe moderne et confortable avec finition indigo authentique. Parfait pour un look casual chic.",
    price: 6500,
    original_price: 7800,
    tags: ["Exclusif", "Jean", "Slim", "Promotion"],
    stock_quantity: 28,
    sold_count: 156,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "98% Coton, 2% Elasthanne" },
      { label: "Coupe", value: "Slim Fit" },
      { label: "Taille", value: "Normale" },
      { label: "Couleur", value: "Indigo Brut" },
      { label: "Entretien", value: "Lavage à froid" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    name: "Montre Chronographe Sport",
    description:
      "Montre chronographe sportive avec boîtier en acier inoxydable. Étanche 100m, mouvement quartz précis. Bracelet en cuir véritable.",
    price: 12500,
    original_price: null,
    tags: ["Montre", "Chronographe", "Sport"],
    stock_quantity: 15,
    sold_count: 67,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Mouvement", value: "Quartz Japonais" },
      { label: "Boîtier", value: "Acier Inoxydable 42mm" },
      { label: "Étanchéité", value: "100m" },
      { label: "Bracelet", value: "Cuir Véritable" },
      { label: "Garantie", value: "2 ans" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    name: "Sneakers Urban Style",
    description:
      "Sneakers urbaines en cuir premium avec semelle en caoutchouc antidérapante. Design moderne et confortable pour un usage quotidien.",
    price: 8900,
    original_price: 10500,
    tags: ["Nouveau", "Sneakers", "Urban", "Promotion"],
    stock_quantity: 22,
    sold_count: 203,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "Cuir Premium" },
      { label: "Semelle", value: "Caoutchouc Antidérapant" },
      { label: "Doublure", value: "Textile Respirant" },
      { label: "Fermeture", value: "Lacets" },
      { label: "Pointures", value: "39 à 46" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-11T11:30:00Z",
  },
  {
    id: "6",
    name: "Casquette Baseball Premium",
    description:
      "Casquette baseball en coton premium avec visière courbée. Logo brodé de qualité, ajustement réglable. Style intemporel et confortable.",
    price: 1800,
    original_price: null,
    tags: ["Casquette", "Baseball", "Premium"],
    stock_quantity: 60,
    sold_count: 178,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "100% Coton Premium" },
      { label: "Visière", value: "Courbée" },
      { label: "Ajustement", value: "Réglable" },
      { label: "Logo", value: "Brodé" },
      { label: "Taille", value: "Unique" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-10T13:20:00Z",
  },
  {
    id: "7",
    name: "Lunettes de Soleil Aviateur",
    description:
      "Lunettes de soleil style aviateur avec verres polarisés UV400. Monture en métal doré, protection maximale et style iconique.",
    price: 3500,
    original_price: 4200,
    tags: ["Exclusif", "Lunettes", "Aviateur", "Promotion"],
    stock_quantity: 18,
    sold_count: 94,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Protection", value: "UV400 100%" },
      { label: "Verres", value: "Polarisés" },
      { label: "Monture", value: "Métal Doré" },
      { label: "Style", value: "Aviateur" },
      { label: "Étui", value: "Inclus" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-09T08:45:00Z",
  },
  {
    id: "8",
    name: "Boots Chelsea Cuir",
    description:
      "Boots Chelsea en cuir véritable avec élastiques latéraux. Semelle en caoutchouc résistante, style britannique authentique et intemporel.",
    price: 11500,
    original_price: null,
    tags: ["Boots", "Chelsea", "Cuir"],
    stock_quantity: 12,
    sold_count: 45,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "Cuir Véritable" },
      { label: "Semelle", value: "Caoutchouc" },
      { label: "Fermeture", value: "Élastiques Latéraux" },
      { label: "Style", value: "Chelsea Britannique" },
      { label: "Pointures", value: "39 à 46" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1608256246200-53e8b47b2dc1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&hue=30",
    ],
    currency: "DA",
    created_at: "2024-01-08T15:10:00Z",
  },
  {
    id: "9",
    name: "Pull Col V Laine Mérinos",
    description:
      "Pull col V en laine mérinos de qualité supérieure. Doux, chaud et respirant. Coupe moderne parfaite pour les saisons fraîches.",
    price: 7200,
    original_price: 8500,
    tags: ["Nouveau", "Pull", "Laine", "Promotion"],
    stock_quantity: 25,
    sold_count: 92,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "100% Laine Mérinos" },
      { label: "Col", value: "Col V" },
      { label: "Coupe", value: "Regular Fit" },
      { label: "Entretien", value: "Lavage à la main" },
      { label: "Tailles", value: "S à XXL" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-07T12:25:00Z",
  },
  {
    id: "10",
    name: "Veste Bomber Vintage",
    description:
      "Veste bomber style vintage en polyester résistant. Doublure matelassée, fermeture éclair YKK. Look rétro et moderne à la fois.",
    price: 9800,
    original_price: null,
    tags: ["Veste", "Bomber", "Vintage"],
    stock_quantity: 18,
    sold_count: 118,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "Polyester Résistant" },
      { label: "Doublure", value: "Matelassée" },
      { label: "Fermeture", value: "Éclair YKK" },
      { label: "Style", value: "Bomber Vintage" },
      { label: "Poches", value: "2 Latérales + 1 Bras" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop&hue=60",
    ],
    currency: "DA",
    created_at: "2024-01-06T17:40:00Z",
  },
  {
    id: "11",
    name: "Montre Minimaliste Acier",
    description:
      "Montre minimaliste avec cadran épuré et bracelet en acier inoxydable. Design scandinave, mouvement quartz précis et résistant à l'eau.",
    price: 5500,
    original_price: 6800,
    tags: ["Montre", "Minimaliste", "Acier", "Promotion"],
    stock_quantity: 30,
    sold_count: 167,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Mouvement", value: "Quartz Précis" },
      { label: "Boîtier", value: "Acier Inoxydable 40mm" },
      { label: "Bracelet", value: "Acier Maillons" },
      { label: "Étanchéité", value: "50m" },
      { label: "Style", value: "Minimaliste" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594576662059-90f5f8b4d7d4?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-05T10:15:00Z",
  },
  {
    id: "12",
    name: "Chino Stretch Beige",
    description:
      "Pantalon chino en coton stretch avec coupe moderne. Confortable et élégant, parfait pour un look smart casual. Finitions de qualité.",
    price: 4200,
    original_price: null,
    tags: ["Chino", "Stretch", "Beige"],
    stock_quantity: 35,
    sold_count: 234,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "97% Coton, 3% Elasthanne" },
      { label: "Coupe", value: "Slim Fit" },
      { label: "Couleur", value: "Beige" },
      { label: "Poches", value: "4 Poches" },
      { label: "Tailles", value: "30 à 42" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop&sat=-30",
    ],
    currency: "DA",
    created_at: "2024-01-04T14:50:00Z",
  },
  {
    id: "13",
    name: "Bonnet Laine Tricotée",
    description:
      "Bonnet en laine tricotée avec revers. Chaud et confortable pour l'hiver. Design intemporel disponible en plusieurs coloris.",
    price: 1500,
    original_price: 1900,
    tags: ["Bonnet", "Laine", "Hiver", "Promotion"],
    stock_quantity: 50,
    sold_count: 156,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Matière", value: "100% Laine Tricotée" },
      { label: "Style", value: "Avec Revers" },
      { label: "Saison", value: "Automne/Hiver" },
      { label: "Entretien", value: "Lavage à la main" },
      { label: "Taille", value: "Unique" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop&hue=180",
    ],
    currency: "DA",
    created_at: "2024-01-03T09:30:00Z",
  },
  {
    id: "14",
    name: "Baskets Running Performance",
    description:
      "Baskets de running haute performance avec technologie d'amorti avancée. Mesh respirant, semelle réactive pour le sport et le quotidien.",
    price: 12800,
    original_price: null,
    tags: ["Exclusif", "Baskets", "Running"],
    stock_quantity: 20,
    sold_count: 78,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Technologie", value: "Amorti Avancé" },
      { label: "Tige", value: "Mesh Respirant" },
      { label: "Semelle", value: "Réactive" },
      { label: "Usage", value: "Running/Quotidien" },
      { label: "Pointures", value: "39 à 47" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-02T16:20:00Z",
  },
  {
    id: "15",
    name: "Lunettes de Soleil Wayfarer",
    description:
      "Lunettes de soleil style wayfarer classique avec verres teintés. Monture en acétate de qualité, protection UV totale et style iconique.",
    price: 2800,
    original_price: 3500,
    tags: ["Nouveau", "Lunettes", "Wayfarer", "Promotion"],
    stock_quantity: 40,
    sold_count: 145,
    whatsapp_number: "+213555123456",
    specifications: [
      { label: "Protection", value: "UV400 100%" },
      { label: "Monture", value: "Acétate Premium" },
      { label: "Verres", value: "Teintés" },
      { label: "Style", value: "Wayfarer Classique" },
      { label: "Étui", value: "Microfibre Inclus" },
    ],
    image_urls: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=500&fit=crop",
    ],
    currency: "DA",
    created_at: "2024-01-01T11:45:00Z",
  },
];

/**
 * Mock data provider class that simulates database operations
 */
class MockDataProvider {
  constructor() {
    this.products = mockProducts;
    console.log("✨ Using mock data provider - 15 clothing products loaded");
  }

  /**
   * Simulate database fetch with loading delay
   * @param {number} delay - Delay in milliseconds
   * @returns {Promise}
   */
  async simulateDelay(delay = 500) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * Get all products (simulates Supabase select)
   * @returns {Promise<{data: Array, error: null}>}
   */
  async fetchProducts() {
    await this.simulateDelay();

    // Format products to match Supabase response structure
    const formattedProducts = this.products.map((product) => ({
      ...product,
      image: product.image_urls?.[0] || "",
      originalPrice: product.original_price,
      stockStatus: product.stock_quantity > 0 ? "En Stock" : "Épuisé",
      soldCount: product.sold_count,
    }));

    return {
      data: formattedProducts,
      error: null,
    };
  }

  /**
   * Get single product by ID (simulates Supabase single)
   * @param {string} id - Product ID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  async fetchProductById(id) {
    await this.simulateDelay(300);

    const product = this.products.find((p) => p.id === id);

    if (!product) {
      return {
        data: null,
        error: { message: `Product with ID ${id} not found` },
      };
    }

    return {
      data: product,
      error: null,
    };
  }

  /**
   * Check if provider is using mock data
   * @returns {boolean}
   */
  isUsingMockData() {
    return true;
  }

  /**
   * Get mock data statistics
   * @returns {Object}
   */
  getStats() {
    const stats = {
      totalProducts: this.products.length,
      categories: {
        nouveau: this.products.filter((p) => p.tags.includes("Nouveau")).length,
        promotion: this.products.filter((p) => p.tags.includes("Promotion"))
          .length,
        exclusif: this.products.filter((p) => p.tags.includes("Exclusif"))
          .length,
      },
      priceRange: {
        min: Math.min(...this.products.map((p) => p.price)),
        max: Math.max(...this.products.map((p) => p.price)),
      },
    };

    console.log("[MOCK] Mock data stats:", stats);
    return stats;
  }
}

export default MockDataProvider;
