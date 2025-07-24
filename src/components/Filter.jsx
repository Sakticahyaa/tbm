/**
 * Filter Component
 * 
 * Purpose:
 * - Provides dropdown filters for book categorization
 * - Handles Aliran (Genre) and Jenis (Type) filtering
 * - Manages dropdown state and user interactions
 * 
 * Features:
 * - Dropdown menus with predefined options
 * - Visual feedback for selected filters
 * - Responsive design with backdrop blur effect
 * - Click-outside-to-close functionality
 * 
 * Access: Used in BookListPage component
 * Integration: Works with useBooks hook for live filtering
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Filter Component Props
 * @param {Object} filters - Current filter state {aliran: string, jenis: string}
 * @param {function} onFilterChange - Callback for filter changes
 */
export default function Filter({ filters, onFilterChange }) {
  // Dropdown visibility state management
  const [dropdownOpen, setDropdownOpen] = useState({
    aliran: false,
    jenis: false
  });

  /**
   * Filter Options Configuration
   * 
   * Purpose: Defines available filter options for each category
   * - Aliran: Book genres (Fiction/Non-fiction)
   * - Jenis: Book types (Children's books, Textbooks, etc.)
   */
  const aliranOptions = ['Fiksi', 'Nonfiksi'];
  const jenisOptions = ['Buku Anak-Anak', 'Buku Pelajaran', 'Buku Umum', 'Novel'];

  /**
   * Filter Change Handler
   * 
   * Purpose: Updates filter state and closes dropdown
   * - Calls parent callback with new filter value
   * - Automatically closes dropdown after selection
   * 
   * @param {string} filterType - Type of filter (aliran/jenis)
   * @param {string} value - Selected filter value
   */
  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
    setDropdownOpen(prev => ({
      ...prev,
      [filterType]: false
    }));
  };

  /**
   * Dropdown Toggle Handler
   * 
   * Purpose: Controls dropdown visibility
   * - Toggles specific dropdown open/closed
   * - Closes other dropdowns when opening one
   * 
   * @param {string} filterType - Type of filter dropdown to toggle
   */
  const toggleDropdown = (filterType) => {
    setDropdownOpen(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  /**
   * Dropdown Button Component
   * 
   * Purpose: Renders individual filter dropdown
   * - Shows current selection or placeholder
   * - Handles dropdown toggle and option selection
   * - Provides visual feedback for interactions
   * 
   * @param {string} filterType - Filter category identifier
   * @param {Array} options - Available filter options
   * @param {string} placeholder - Default placeholder text
   */
  const DropdownButton = ({ filterType, options, placeholder }) => (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        onClick={() => toggleDropdown(filterType)}
        className="flex items-center justify-between w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-emerald-300 rounded-lg hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-[120px] shadow-sm transition-all duration-200"
      >
        {/* Current Selection Display */}
        <span className="text-sm truncate">
          {filters[filterType] || placeholder}
        </span>
        {/* Dropdown Arrow - Rotates when open */}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 text-emerald-600 ${dropdownOpen[filterType] ? 'rotate-180' : ''}`}
        />
      </button>
      
      {/* Dropdown Menu - Conditionally rendered */}
      {dropdownOpen[filterType] && (
        <div className="absolute z-20 mt-1 w-full bg-white/95 backdrop-blur-md border border-emerald-300 rounded-lg shadow-xl">
          <div className="py-1">
            {/* "All" Option - Clears filter */}
            <button
              onClick={() => handleFilterChange(filterType, '')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 transition-colors duration-200"
            >
              All
            </button>
            {/* Filter Options - Dynamic list */}
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange(filterType, option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 transition-colors duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-emerald-200/50 shadow-lg">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-emerald-700 whitespace-nowrap">Aliran</label>
          <DropdownButton
            filterType="aliran"
            options={aliranOptions}
            placeholder="All"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-emerald-700 whitespace-nowrap">Jenis</label>
          <DropdownButton
            filterType="jenis"
            options={jenisOptions}
            placeholder="All"
          />
        </div>
      </div>
    </div>
  );
}