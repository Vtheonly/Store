// src/utils/devUtils.js

import dataService from '../services/dataService';

/**
 * Development utilities for testing and debugging
 */

/**
 * Toggle between mock and real data (for development/testing)
 * @param {boolean} useMock - Whether to use mock data
 */
export const toggleMockData = (useMock) => {
  dataService.setMockMode(useMock);
  console.log(`[DATA] Switched to ${useMock ? 'mock' : 'real'} data mode`);
  
  // Reload the page to see changes
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

/**
 * Get current data source information
 * @returns {Object} Data source info
 */
export const getDataSourceInfo = () => {
  const info = dataService.getDataSourceInfo();
  console.table(info);
  return info;
};

/**
 * Retry database connection
 * @returns {Promise<boolean>} Success status
 */
export const retryDatabaseConnection = async () => {
  console.log('[DATABASE] Attempting to reconnect to database...');
  const success = await dataService.retryConnection();
  
  if (success) {
    console.log('✅ Database connection restored');
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  } else {
    console.log('❌ Database connection still unavailable');
  }
  
  return success;
};

/**
 * Log mock data statistics
 */
export const logMockDataStats = () => {
  if (dataService.isUsingMockData()) {
    const info = dataService.getDataSourceInfo();
    console.log('[STATS] Mock Data Statistics:');
    console.table(info.stats);
  } else {
    console.log('ℹ️ Currently using real database data');
  }
};

// Make utilities available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.devUtils = {
    toggleMockData,
    getDataSourceInfo,
    retryDatabaseConnection,
    logMockDataStats,
    dataService
  };
  
  console.log('[DEV] Development utilities available at window.devUtils');
  console.log('Available methods:');
  console.log('- toggleMockData(true/false)');
  console.log('- getDataSourceInfo()');
  console.log('- retryDatabaseConnection()');
  console.log('- logMockDataStats()');
}