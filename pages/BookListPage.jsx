/**
 * Book List Page Component
 * 
 * Purpose:
 * - Displays filtered list of books based on location parameter
 * - Provides search and filter functionality
 * - Handles responsive sidebar navigation
 * - Manages book data fetching from Supabase
 * 
 * Features:
 * - Dynamic route-based filtering (/tbm-rw-01, /semua-buku, etc.)
 * - Responsive design with collapsible sidebar
 * - Real-time search and filtering
 * - Mobile-optimized table layout
 * - Loading states and error handling
 * 
 * Access: Available at "/:location" routes
 * Navigation: Links to "/detail/:bookId" for individual books
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Header from '/src/components/Header';
import Sidebar from '/src/components/Sidebar';
import Searchbar from '/src/components/Searchbar';
import Filter from '/src/components/Filter';
import Tablelist from '/src/components/Tablelist';
import { useBooks } from '../hooks/useBooks';

export default function BookListPage() {
  const { location } = useParams(); // Extract location from URL parameter
  const navigate = useNavigate();
  
  // UI State Management
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar visibility
  const [filters, setFilters] = useState({
    aliran: '',
    jenis: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Location Mapping Function
   * 
   * Purpose: Converts URL parameters to database location values
   * - Maps route parameters to actual location names in database
   * - Handles special case for "semua-buku" (all books)
   * 
   * @param {string} locationParam - URL parameter value
   * @returns {string} - Database location value or 'all'
   */
  const getLocationFilter = (locationParam) => {
    const locationMap = {
      'semua-buku': 'all',
      'tbm-rw-01': 'TBM RW 01',
      'tbm-rw-02': 'TBM RW 02',
      'tbm-rw-03': 'TBM RW 03',
      'tbm-rw-04': 'TBM RW 04',
      'tbm-rw-05': 'TBM RW 05',
      'tbm-rw-06': 'TBM RW 06',
      'tbm-rw-07': 'TBM RW 07',
      'tbm-pendopo': 'TBM Pendopo Kelurahan',
      'tbm-kantor': 'TBM Kantor Kelurahan'
    };
    return locationMap[locationParam] || 'all';
  };

  /**
   * Page Title Generator
   * 
   * Purpose: Creates user-friendly page titles
   * - Shows "Semua Buku" for all books view
   * - Shows actual location name for filtered views
   */
  const getPageTitle = () => {
    const actualLocation = getLocationFilter(location);
    return actualLocation === 'all' ? 'Semua Buku' : actualLocation;
  };

  // Data fetching hook - automatically refetches when dependencies change
  const { books, loading, error } = useBooks(
    getLocationFilter(location), 
    filters, 
    searchTerm
  );

  /**
   * Filter Change Handler
   * 
   * Purpose: Updates filter state when user selects filter options
   * - Maintains filter state in component
   * - Triggers automatic data refetch via useBooks hook
   * 
   * @param {string} filterType - Type of filter (aliran/jenis)
   * @param {string} value - Selected filter value
   */
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  /**
   * Search Handler
   * 
   * Purpose: Updates search term state
   * - Triggers real-time search via useBooks hook
   * - Debouncing handled by the hook itself
   * 
   * @param {string} value - Search input value
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  /**
   * Book Click Handler
   * 
   * Purpose: Navigates to individual book detail page
   * - Uses React Router navigation
   * - Passes book ID as URL parameter
   * 
   * @param {Object} book - Book object with id property
   */
  const handleBookClick = (book) => {
    navigate(`/detail/${book.id}`);
  };

  /**
   * Sidebar Toggle Handler
   * 
   * Purpose: Controls mobile sidebar visibility
   * - Toggles sidebar open/closed state
   * - Used for responsive mobile navigation
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /**
   * Location Change Handler
   * 
   * Purpose: Handles navigation between different locations
   * - Resets filters and search when changing location
   * - Closes mobile sidebar after selection
   * - Uses React Router for navigation
   * 
   * @param {string} newLocation - Target location value
   */
  const handleLocationChange = (newLocation) => {
    // Reset filters when changing location
    setFilters({ aliran: '', jenis: '' });
    setSearchTerm('');
    setSidebarOpen(false); // Close mobile sidebar
    
    // Navigate to new location route
    const routeMap = {
      'all': '/semua-buku',
      'TBM RW 01': '/tbm-rw-01',
      'TBM RW 02': '/tbm-rw-02',
      'TBM RW 03': '/tbm-rw-03',
      'TBM RW 04': '/tbm-rw-04',
      'TBM RW 05': '/tbm-rw-05',
      'TBM RW 06': '/tbm-rw-06',
      'TBM RW 07': '/tbm-rw-07',
      'TBM Pendopo Kelurahan': '/tbm-pendopo',
      'TBM Kantor Kelurahan': '/tbm-kantor'
    };
    
    navigate(routeMap[newLocation] || '/semua-buku');
  };

  /**
   * Back to Landing Handler
   * 
   * Purpose: Returns user to landing page
   * - Navigates to root route "/"
   * - Closes mobile sidebar if open
   */
  const handleBackToLanding = () => {
    setSidebarOpen(false);
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements - Decorative floating shapes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-300 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-emerald-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-emerald-200 rounded-full animate-bounce delay-500"></div>
      </div>
      
      {/* Mobile Sidebar Overlay - Dark overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Component - Navigation menu */}
      <div className={`
        fixed lg:relative z-50 lg:z-20
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          activeLocation={getLocationFilter(location)}
          onLocationChange={handleLocationChange}
          onBackToLanding={handleBackToLanding}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Header with Mobile Menu Button */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-emerald-200 relative z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all duration-200"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            {/* Header Component */}
            <div className="flex-1 lg:flex-none">
              <Header />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
            </div>
            
            {/* Search and Filter Controls */}
            <div className='flex flex-col lg:flex-row gap-4 lg:gap-10 justify-between items-stretch lg:items-center mb-6'>
              {/* Filter Component - Takes remaining space on desktop */}
              <div className='flex-1 order-2 lg:order-1'>
                <Filter filters={filters} onFilterChange={handleFilterChange} />
              </div>
              
              {/* Search Component - Fixed width on desktop, full width on mobile */}
              <div className="w-full lg:w-1/3 order-1 lg:order-2">
                <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
              </div>
            </div>
            
            {/* Book List Table */}
            <div className="space-y-4">
              <Tablelist 
                books={books}
                loading={loading}
                error={error}
                onBookClick={handleBookClick}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}