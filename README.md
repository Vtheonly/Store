# StyleShop - Fashion Store Application

A modern React-based e-commerce application for premium clothing, shoes, and watches.

## Features

- Premium fashion catalog (clothing, shoes, watches)
- Advanced search and filtering
- Dark/Light theme support
- Responsive design
- Mock data system for development
- Admin panel for product management

## Mock Data System

The application includes a robust mock data system that automatically provides dummy products when the database is unavailable. This ensures a smooth development experience and allows for easy demonstration.

### How it works

1. **Automatic Detection**: The app automatically detects if Supabase is available
2. **Seamless Fallback**: If the database is unavailable, it switches to mock data
3. **Visual Indicator**: A subtle indicator shows when mock data is being used
4. **Realistic Data**: 15 fashion products including clothing, shoes, and watches with complete specifications and images

### Development Utilities

In development mode, several utilities are available via the browser console:

```javascript
// Toggle between mock and real data
window.devUtils.toggleMockData(true);  // Use mock data
window.devUtils.toggleMockData(false); // Use real data

// Get current data source information
window.devUtils.getDataSourceInfo();

// Retry database connection
window.devUtils.retryDatabaseConnection();

// View mock data statistics
window.devUtils.logMockDataStats();
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **View the application**
   - Open http://localhost:5173
   - The app will automatically use mock data if no database is configured

## Environment Setup

### With Supabase (Optional)

Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

### Without Database

The application works perfectly without any database setup - it will automatically use the built-in mock data system.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # Data services and API layer
│   ├── dataService.js  # Main data service with fallback logic
│   └── mockDataProvider.js # Mock data provider
├── utils/              # Utility functions
├── admin/              # Admin panel components
└── styles/             # CSS files
```

## Mock Data

The mock data includes:

- **15 Fashion Products**: T-shirts, sneakers, watches, hoodies, blazers, etc.
- **Realistic Pricing**: In Algerian Dinars (DA)
- **Complete Specifications**: Material details, sizes, and features for each product
- **Multiple Images**: Product galleries with high-quality placeholder images
- **Categories**: Nouveautés, Promotions, Premium tags
- **Stock Information**: Quantities and sold counts

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Supabase** - Database (optional)
- **CSS Variables** - Theming system

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both mock and real data
5. Submit a pull request

## License

This project is private and proprietary to StyleShop Fashion Store.