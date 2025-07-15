/**
 * Table List Component
 * 
 * Purpose:
 * - Displays books in a responsive table format
 * - Handles sorting functionality for columns
 * - Manages loading and error states
 * - Provides click navigation to book details
 * 
 * Features:
 * - Fixed column widths (Judul 30%, Penulis 30%, Aliran 15%, Jenis 15%, Actions 10%)
 * - Responsive design with progressive disclosure on mobile
 * - Sortable columns with visual indicators
 * - Loading states and error handling
 * - Click-to-navigate functionality
 * 
 * Access: Used within BookListPage component
 * Navigation: Triggers book detail navigation via onBookClick callback
 */

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreVertical, Book } from 'lucide-react';

/**
 * Tablelist Component Props
 * @param {Array} books - Array of book objects to display
 * @param {boolean} loading - Loading state indicator
 * @param {string} error - Error message if data fetching failed
 * @param {function} onBookClick - Callback for book row clicks
 */
export default function Tablelist({ books, loading, error, onBookClick }) {
  // Sorting state management
  const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });

  /**
   * Sorted Books Memoization
   * 
   * Purpose: Applies sorting to book list without mutating original data
   * - Uses React.useMemo for performance optimization
   * - Handles string-based sorting with locale comparison
   * - Maintains original array if no sorting is applied
   */
  const sortedBooks = React.useMemo(() => {
    if (!sortOrder.field || !books) return books;
    
    return [...books].sort((a, b) => {
      const aValue = a[sortOrder.field];
      const bValue = b[sortOrder.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder.direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
      return 0;
    });
  }, [books, sortOrder]);

  /**
   * Sort Handler Function
   * 
   * Purpose: Manages column sorting state
   * - Toggles between ascending/descending order
   * - Resets to ascending when switching columns
   * 
   * @param {string} field - Column field name to sort by
   */
  const handleSort = (field) => {
    const newDirection = sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field, direction: newDirection });
  };

  /**
   * Sort Button Component
   * 
   * Purpose: Renders sortable column header with visual indicators
   * - Shows up/down arrows based on current sort state
   * - Highlights active sort direction
   * - Handles click events for sorting
   * 
   * @param {string} field - Column field name
   */
  const SortButton = ({ field }) => (
    <button
      onClick={() => handleSort(field)}
      className="ml-2 inline-flex flex-col items-center justify-center h-4 w-4 text-gray-400 hover:text-gray-600"
    >
      {/* Up arrow - highlighted when ascending */}
      <ChevronUp
        className={`w-3 h-3 ${sortOrder.field === field && sortOrder.direction === 'asc' ? 'text-gray-700' : 'text-gray-400'}`}
      />
      {/* Down arrow - highlighted when descending */}
      <ChevronDown
        className={`w-3 h-3 ${sortOrder.field === field && sortOrder.direction === 'desc' ? 'text-gray-700' : 'text-gray-400'}`}
      />
    </button>
  );

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-emerald-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="overflow-x-auto">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <span className="ml-3 text-emerald-600">Loading books...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-red-600 text-center">
              <p className="font-medium">Error loading books</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && (
        <table className="w-full">
          <thead className="bg-emerald-50/80 backdrop-blur-sm border-b border-emerald-200">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700" style={{ width: '30%' }}>
                <div className="flex items-center">
                  Judul
                  <SortButton field="judul" />
                </div>
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700 hidden sm:table-cell" style={{ width: '30%' }}>
                <div className="flex items-center">
                  Penulis
                  <SortButton field="penulis" />
                </div>
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700 hidden md:table-cell" style={{ width: '15%' }}>
                Aliran
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700 hidden lg:table-cell" style={{ width: '15%' }}>
                Jenis
              </th>
              <th className="px-3 sm:px-6 py-3 text-right font-medium text-emerald-700" style={{ width: '10%' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-emerald-100">
            {(!sortedBooks || sortedBooks.length === 0) ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-600">
                  <div className="flex flex-col items-center space-y-3">
                    <Book className="w-12 h-12 text-gray-400" />
                  Tidak ada data
                  </div>
                </td>
              </tr>
            ) : (
              sortedBooks.map((book) => (
                <tr 
                  key={book.id} 
                  className="hover:bg-emerald-50/50 cursor-pointer transition-colors duration-200 group"
                  onClick={() => onBookClick(book)}
                >
                  <td className="px-3 sm:px-6 py-4" style={{ width: '30%' }}>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-800 transition-colors duration-200">
                      <div className="line-clamp-2 sm:line-clamp-1">{book.judul}</div>
                      <div className="text-xs text-gray-600 mt-1 sm:hidden">{book.penulis}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell" style={{ width: '30%' }}>
                    <div className="text-sm text-gray-900">{book.penulis}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell" style={{ width: '15%' }}>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {book.aliran}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell" style={{ width: '15%' }}>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {book.jenis}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium" style={{ width: '10%' }}>
                    <button className="text-gray-400 hover:text-emerald-600 transition-colors duration-200">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}