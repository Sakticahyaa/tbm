/**
 * Main Application Component
 * 
 * This is the root component that handles:
 * - React Router setup and route definitions
 * - Global state management for sidebar visibility
 * - Route-based navigation between different views
 * 
 * Routes:
 * - "/" - Landing page
 * - "/:location" - Book list filtered by location (e.g., /tbm-rw-01)
 * - "/detail/:bookId" - Individual book detail page
 * 
 * Access: This is the main entry point of the application
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import BookListPage from '../pages/BookListPage';
import BookDetailPage from '../pages/BookDetailPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Landing Page Route - No authentication required */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Book List Routes - Dynamic location parameter */}
        <Route path="/:location" element={<BookListPage />} />
        
        {/* Book Detail Route - Individual book view */}
        <Route path="/detail/:bookId" element={<BookDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;