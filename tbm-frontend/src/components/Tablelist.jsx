import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, MoreVertical } from 'lucide-react';

export default function Tablelist({ books, filters, searchTerm, onBookClick }) {
  const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });

  // Filter and search logic
  const filteredBooks = useMemo(() => {
    let filtered = books;

    // Apply filters
    if (filters.aliran) {
      filtered = filtered.filter(book => book.aliran === filters.aliran);
    }
    if (filters.jenis) {
      filtered = filtered.filter(book => book.jenis === filters.jenis);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.aliran.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOrder.field) {
      filtered.sort((a, b) => {
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
    }

    return filtered;
  }, [books, filters, searchTerm, sortOrder]);

  const handleSort = (field) => {
    const newDirection = sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field, direction: newDirection });
  };

  const SortButton = ({ field }) => (
    <button
      onClick={() => handleSort(field)}
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center">
                  Judul
                  <SortButton field="judul" />
                </div>
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                <div className="flex items-center">
                  Penulis
                  <SortButton field="penulis" />
                </div>
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Aliran
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Jenis
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Lokasi
              </th>
              <th className="px-6 py-3 text-right font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr 
                  key={book.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onBookClick(book)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{book.judul}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.penulis}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.aliran}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.jenis}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.lokasi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}