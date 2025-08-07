# Implementation Plan

- [x] 1. Create mock data provider with dummy products
  - Create a new file `src/services/mockDataProvider.js` with realistic French product data
  - Include 15 products covering power tools, hand tools, and workshop equipment
  - Ensure each product has all required fields matching the Supabase schema
  - Distribute products across different categories (Nouveau, Promotion, Exclusif)
  - Use placeholder images from Unsplash or similar service
  - _Requirements: 1.2, 1.3, 2.1, 2.3_

- [x] 2. Implement data service layer with fallback logic
  - Create `src/services/dataService.js` that handles database connection detection
  - Implement automatic fallback to mock data when Supabase is unavailable
  - Add timeout mechanism for database connection attempts
  - Include method to check if mock data is being used
  - Maintain consistent API interface for both data sources
  - _Requirements: 1.1, 1.4, 3.4, 3.5_

- [x] 3. Update StorePage component to use data service
  - Modify `src/pages/StorePage.jsx` to use the new data service instead of direct Supabase calls
  - Ensure filtering, searching, and categorization work with both real and mock data
  - Add subtle indicator when mock data is being used
  - Maintain existing loading and error states
  - Test that all product categories are properly populated
  - _Requirements: 1.5, 2.2, 2.4, 2.5_

- [x] 4. Update ProductDetailPage for mock data compatibility
  - Modify `src/pages/ProductDetailPage.jsx` to use the data service
  - Ensure product detail view works correctly with mock products
  - Handle mock product IDs and routing appropriately
  - Maintain WhatsApp integration with mock contact numbers
  - Test image gallery functionality with mock product images
  - _Requirements: 2.2, 3.3_

- [x] 5. Add development utilities and documentation
  - Create utility functions to easily switch between mock and real data
  - Add console logging to indicate when mock data is being used
  - Update README with information about the mock data system
  - Add JSDoc comments to all new service methods
  - Create simple admin toggle to force mock data mode for testing
  - _Requirements: 3.1, 3.2_