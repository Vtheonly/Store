# Design Document

## Overview

The mock data system will provide a fallback mechanism that displays realistic dummy products when the Supabase database is unavailable. The system will be implemented as a separate data service that mimics the database API, ensuring seamless integration with existing components.

## Architecture

### Data Flow
```
StorePage Component
    ↓
Data Service Layer (New)
    ↓
Database Available? → Yes → Supabase Client
    ↓
    No → Mock Data Provider (New)
```

### Component Structure
- **DataService**: Main service that handles data fetching logic
- **MockDataProvider**: Contains dummy product data and provides database-like methods
- **ProductService**: Wrapper that abstracts data source (real vs mock)

## Components and Interfaces

### DataService Interface
```javascript
interface DataService {
  fetchProducts(): Promise<Product[]>
  fetchProductById(id: string): Promise<Product>
  isUsingMockData(): boolean
}
```

### MockDataProvider
- Contains array of realistic dummy products
- Provides methods that simulate database operations
- Includes error handling and loading states
- Maintains consistent data structure with Supabase schema

### Product Data Structure
```javascript
interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  tags: string[]
  stock_quantity: number
  sold_count: number
  whatsapp_number: string
  specifications: { label: string, value: string }[]
  image_urls: string[]
  currency: string
  created_at: string
}
```

## Data Models

### Mock Products Categories
- **Power Tools**: Drills, saws, grinders (5 products)
- **Hand Tools**: Screwdrivers, wrenches, measuring tools (5 products)  
- **Workshop Equipment**: Compressors, vacuums, ladders (5 products)

### Tag Distribution
- "Nouveau": 5 products
- "Promotion": 4 products  
- "Exclusif": 3 products
- Various tool-specific tags

### Price Range
- Budget tools: 2,000 - 5,000 DA
- Mid-range tools: 5,000 - 15,000 DA
- Professional tools: 15,000 - 40,000 DA

## Error Handling

### Database Connection Detection
1. Attempt Supabase connection with timeout
2. On failure, log warning and switch to mock data
3. Display subtle indicator when using mock data
4. Provide retry mechanism for database connection

### Fallback Strategy
- Primary: Supabase database
- Fallback: Mock data provider
- Error states: Show appropriate messages
- Loading states: Consistent across both data sources

## Testing Strategy

### Unit Tests
- Mock data provider functionality
- Data service switching logic
- Product filtering with mock data
- Search functionality with dummy products

### Integration Tests
- StorePage with mock data
- ProductDetailPage with dummy products
- Category filtering and sorting
- Search and filter combinations

### Manual Testing
- Disconnect database and verify mock data loads
- Test all filtering options with dummy products
- Verify product detail pages work with mock data
- Check responsive design with various product names/descriptions