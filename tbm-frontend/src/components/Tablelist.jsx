import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, MoreVertical, Book } from 'lucide-react';

export default function Tablelist({ books, loading, error, onBookClick }) {
  const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });

  const sortedBooks = useMemo(() => {
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

  const handleSort = (field) => {
    const newDirection = sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field, direction: newDirection });
  };

  const SortButton = ({ field }) => (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent row click when sorting
        handleSort(field);
      }}
      className="ml-2 inline-flex flex-col items-center justify-center h-4 w-4 text-gray-400 hover:text-gray-600"
    >
      <ChevronUp
        className={`w-3 h-3 ${sortOrder.field === field && sortOrder.direction === 'asc' ? 'text-gray-700' : 'text-gray-400'}`}
      />
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
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead className="bg-emerald-50/80 backdrop-blur-sm border-b border-emerald-200">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700">
                <div className="flex items-center">
                  Judul
                  <SortButton field="judul" />
                </div>
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700 hidden sm:table-cell">
                <div className="flex items-center">
                  Penulis
                  <SortButton field="penulis" />
                </div>
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700 hidden md:table-cell">
                Aliran
              </th>
              <th className="px-3 sm:px-6 py-3 text-left font-medium text-emerald-700 hidden lg:table-cell">
                Jenis
              </th>
              <th className="px-3 sm:px-6 py-3 text-right font-medium text-emerald-700">
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
                  <td className="px-3 sm:px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-800 transition-colors duration-200">
                      <div className="truncate">{book.judul}</div>
                      <div className="text-xs text-gray-600 mt-1 sm:hidden">{book.penulis}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                    <div className="text-sm text-gray-900 truncate">{book.penulis}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {book.aliran}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {book.jenis}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
