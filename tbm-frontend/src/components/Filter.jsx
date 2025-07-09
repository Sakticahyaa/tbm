import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Filter({ filters, onFilterChange }) {
  const [dropdownOpen, setDropdownOpen] = useState({
    aliran: false,
    jenis: false
  });

  const aliranOptions = ['Fiksi', 'Nonfiksi'];
  const jenisOptions = ['Buku Anak-Anak', 'Buku Pelajaran', 'Buku Umum', 'Novel'];

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
    setDropdownOpen(prev => ({
      ...prev,
      [filterType]: false
    }));
  };

  const toggleDropdown = (filterType) => {
    setDropdownOpen(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const DropdownButton = ({ filterType, options, placeholder }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(filterType)}
        className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-[120px]"
      >
        <span className="text-sm truncate">
          {filters[filterType] || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${dropdownOpen[filterType] ? 'rotate-180' : ''}`}
        />
      </button>
      
      {dropdownOpen[filterType] && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            <button
              onClick={() => handleFilterChange(filterType, '')}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              All
            </button>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange(filterType, option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
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
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Aliran Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Aliran</label>
          <DropdownButton
            filterType="aliran"
            options={aliranOptions}
            placeholder="All"
          />
        </div>

        {/* Jenis Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Jenis</label>
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