import React, { useState } from 'react';

export default function Filter() {
  const [filters, setFilters] = useState({
    penulis: '',
    aliran: '',
    jenis: '',
    lokasi: ''
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      penulis: '',
      aliran: '',
      jenis: '',
      lokasi: ''
    });
  };

  return (
    <div className="bg-gray-50 p-1.5 px-3 rounded-lg border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center align-center">

        {/* Penulis Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Penulis</label>
          <button className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm">{filters.penulis || 'All'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Aliran Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Aliran</label>
          <button className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm">{filters.aliran || 'All'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Jenis Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Jenis</label>
          <button className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm">{filters.jenis || 'All'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}