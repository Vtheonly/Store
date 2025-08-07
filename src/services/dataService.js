// src/services/dataService.js

import { supabase } from "../../api/supabaseClient";
import MockDataProvider from "./mockDataProvider";

/**
 * Data service that handles automatic fallback between Supabase and mock data
 */
class DataService {
  constructor() {
    this.mockProvider = new MockDataProvider();
    this.isUsingMock = false;
    this.connectionTested = false;
    this.connectionTimeout = 5000; // 5 seconds timeout
  }

  /**
   * Test database connection with timeout
   * @returns {Promise<boolean>}
   */
  async testDatabaseConnection() {
    if (this.connectionTested) {
      return !this.isUsingMock;
    }

    try {
      console.log('[DATABASE] Testing database connection...');
      
      // Create a promise that rejects after timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout')), this.connectionTimeout);
      });

      // Test connection with a simple query
      const connectionPromise = supabase
        .from('products')
        .select('id')
        .limit(1);

      // Race between connection and timeout
      await Promise.race([connectionPromise, timeoutPromise]);
      
      console.log('✅ Database connection successful');
      this.isUsingMock = false;
      this.connectionTested = true;
      return true;

    } catch (error) {
      console.warn('⚠️ Database connection failed, falling back to mock data:', error.message);
      this.isUsingMock = true;
      this.connectionTested = true;
      
      // Show mock data stats
      this.mockProvider.getStats();
      return false;
    }
  }

  /**
   * Get all products with automatic fallback
   * @returns {Promise<{data: Array, error: Object|null}>}
   */
  async fetchProducts() {
    // Test connection if not already tested
    if (!this.connectionTested) {
      await this.testDatabaseConnection();
    }

    if (this.isUsingMock) {
      return await this.mockProvider.fetchProducts();
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn('Database query failed, switching to mock data:', error.message);
        this.isUsingMock = true;
        return await this.mockProvider.fetchProducts();
      }

      return { data, error: null };

    } catch (error) {
      console.warn('Database error, using mock data:', error.message);
      this.isUsingMock = true;
      return await this.mockProvider.fetchProducts();
    }
  }

  /**
   * Get single product by ID with automatic fallback
   * @param {string} productId - Product ID
   * @returns {Promise<{data: Object|null, error: Object|null}>}
   */
  async fetchProductById(productId) {
    // Test connection if not already tested
    if (!this.connectionTested) {
      await this.testDatabaseConnection();
    }

    if (this.isUsingMock) {
      return await this.mockProvider.fetchProductById(productId);
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.warn('Database query failed, trying mock data:', error.message);
        return await this.mockProvider.fetchProductById(productId);
      }

      return { data, error: null };

    } catch (error) {
      console.warn('Database error, using mock data:', error.message);
      return await this.mockProvider.fetchProductById(productId);
    }
  }

  /**
   * Check if currently using mock data
   * @returns {boolean}
   */
  isUsingMockData() {
    return this.isUsingMock;
  }

  /**
   * Force switch to mock data (for testing)
   * @param {boolean} useMock - Whether to use mock data
   */
  setMockMode(useMock = true) {
    this.isUsingMock = useMock;
    this.connectionTested = true;
    
    if (useMock) {
      console.log('[MODE] Forced mock data mode enabled');
      this.mockProvider.getStats();
    } else {
      console.log('[DATABASE] Attempting to reconnect to database...');
      this.connectionTested = false;
    }
  }

  /**
   * Retry database connection
   * @returns {Promise<boolean>}
   */
  async retryConnection() {
    console.log('[DATABASE] Retrying database connection...');
    this.connectionTested = false;
    this.isUsingMock = false;
    return await this.testDatabaseConnection();
  }

  /**
   * Get current data source info
   * @returns {Object}
   */
  getDataSourceInfo() {
    return {
      isUsingMock: this.isUsingMock,
      connectionTested: this.connectionTested,
      source: this.isUsingMock ? 'Mock Data Provider' : 'Supabase Database',
      stats: this.isUsingMock ? this.mockProvider.getStats() : null
    };
  }
}

// Create singleton instance
const dataService = new DataService();

// Export both the instance and class for flexibility
export default dataService;
export { DataService };