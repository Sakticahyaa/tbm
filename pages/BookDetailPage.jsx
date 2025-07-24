/**
 * Book Detail Page Component
 * 
 * Purpose:
 * - Displays comprehensive information about a single book
 * - Provides navigation back to book list
 * - Maintains search functionality in header
 * - Handles book data fetching by ID
 * 
 * Features:
 * - Route-based book ID parameter (/detail/:bookId)
 * - Responsive grid layout for book information
 * - Loading states and error handling
 * - Search functionality in header
 * - Navigation breadcrumbs
 * 
 * Access: Available at "/detail/:bookId" route
 * Navigation: Back button returns to previous book list view
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, BookOpen, Building, Palette, Hash } from 'lucide-react';
import Searchbar from '/src/components/Searchbar';
import { bookService } from '../services/bookService';

export default function BookDetailPage() {
  const { bookId } = useParams(); // Extract book ID from URL parameter
  const navigate = useNavigate();
  
  // Component State
  const [book, setBook] = useState(null); // Current book data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(''); // Search input value

  /**
   * Book Data Fetching Effect
   * 
   * Purpose: Loads book data when component mounts or bookId changes
   * - Fetches individual book data from Supabase
   * - Handles loading and error states
   * - Transforms database fields to component format
   */
  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const data = await bookService.getBookById(bookId);
        
        if (data) {
          // Transform database fields to match component expectations
          const transformedBook = {
            id: data.id,
            judul: data.judul_buku,
            penulis: data.penulis_buku,
            aliran: data.aliran_buku,
            jenis: data.jenis_buku,
            lokasi: data.lokasi_buku,
            sinopsis: data.sinopsis_buku,
            penerbit: data.penerbit_buku,
            ilustrator: data.ilustrator_buku,
            isbn: data.isbn
          };
          setBook(transformedBook);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load book details');
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  /**
   * Back Navigation Handler
   * 
   * Purpose: Returns user to previous page
   * - Uses browser history to go back
   * - Maintains user's previous location and filters
   */
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  /**
   * Search Change Handler
   * 
   * Purpose: Updates search term state
   * - Maintains search functionality in header
   * - Could be used for future search-within-detail features
   * 
   * @param {string} value - Search input value
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  /**
   * Back to Landing Handler
   * 
   * Purpose: Returns user to landing page
   * - Direct navigation to root route
   */
  const handleBackToLanding = () => {
    navigate('/');
  };

  // Loading State Render
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="text-emerald-600 font-medium">Loading book details...</span>
        </div>
      </div>
    );
  }

  // Error State Render
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Book</h2>
            <p className="text-lg">{error}</p>
          </div>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Book Not Found State
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The requested book could not be found.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements - Decorative floating shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-300 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-emerald-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-emerald-200 rounded-full animate-bounce delay-500"></div>
      </div>
      
      {/* Header Section - Navigation and search */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-emerald-200 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 gap-4">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Kembali ke daftar buku</span>
          </button>
          
          {/* Search and Menu Section */}
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="w-full sm:w-80">
              <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>
            <button 
              onClick={handleBackToLanding}
              className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all duration-200"
              title="Kembali ke Beranda"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-emerald-200/50 p-4 sm:p-6 lg:p-8">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-2">Detail Buku</h1>
          </div>

          {/* Book Title */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{book.judul}</h2>
          </div>

          {/* Book Details Grid - Responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Author Information */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  Penulis
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{book.penulis}</p>
              </div>

              {/* Synopsis */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  Sinopsis
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed ml-6 sm:ml-7">{book.sinopsis}</p>
              </div>

              {/* Book Genre */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Aliran Buku
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{book.aliran}</p>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  Lokasi
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{book.lokasi}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Publisher */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  Penerbit
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{book.penerbit}</p>
              </div>

              {/* Illustrator */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  Ilustrator
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{book.ilustrator}</p>
              </div>

              {/* Book Type */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  Jenis Buku
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{book.jenis}</p>
              </div>

              {/* ISBN */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                  <Hash className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  ISBN
                </h3>
                <p className="text-sm sm:text-base text-gray-700 ml-6 sm:ml-7">{book.isbn}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}