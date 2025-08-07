# Requirements Document

## Introduction

This feature will implement a mock data system for the DTL store application to provide dummy product data when the Supabase database is unavailable or not configured. This will allow developers and users to see the application with realistic data without requiring a database setup.

## Requirements

### Requirement 1

**User Story:** As a developer, I want the application to show dummy products when the database is unavailable, so that I can see how the interface looks with data.

#### Acceptance Criteria

1. WHEN the application fails to connect to Supabase THEN the system SHALL display mock product data
2. WHEN mock data is being used THEN the system SHALL show at least 15 realistic products
3. WHEN displaying mock products THEN each product SHALL have all required fields (name, price, images, tags, etc.)
4. WHEN using mock data THEN the filtering system SHALL work with the dummy products
5. WHEN mock data is active THEN product categories SHALL be properly populated (Nouveautés, Promotions, etc.)

### Requirement 2

**User Story:** As a user, I want to see realistic product data even without a database connection, so that I can evaluate the application's functionality.

#### Acceptance Criteria

1. WHEN viewing the store page THEN mock products SHALL display with realistic French product names
2. WHEN viewing product details THEN mock products SHALL have complete specifications and descriptions
3. WHEN browsing categories THEN mock products SHALL be distributed across different categories
4. WHEN searching products THEN the search functionality SHALL work with mock data
5. WHEN filtering by price or tags THEN the filters SHALL work with mock products

### Requirement 3

**User Story:** As a developer, I want the mock data system to be easily maintainable, so that I can update or extend the dummy products as needed.

#### Acceptance Criteria

1. WHEN implementing mock data THEN it SHALL be stored in a dedicated module
2. WHEN adding new mock products THEN the process SHALL be straightforward
3. WHEN mock data is used THEN it SHALL follow the same data structure as real products
4. WHEN the application starts THEN it SHALL automatically detect database availability
5. WHEN switching between mock and real data THEN the user experience SHALL be seamless