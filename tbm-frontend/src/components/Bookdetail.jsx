import React from 'react';
import { ArrowLeft, User, MapPin, BookOpen, Building, Palette, Hash } from 'lucide-react';
import Searchbar from './Searchbar';

export default function Bookdetail({ book, onBack, searchTerm, onSearchChange }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Kembali ke daftar buku</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-80">
              <Searchbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Detail Buku</h1>
          </div>

          {/* Book Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{book.judul}</h2>
          </div>

          {/* Book Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Penulis */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-600" />
                  Penulis
                </h3>
                <p className="text-gray-700 ml-7">{book.penulis}</p>
              </div>

              {/* Sinopsis */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-600" />
                  Sinopsis
                </h3>
                <p className="text-gray-700 leading-relaxed ml-7">{book.sinopsis}</p>
              </div>

              {/* Aliran Buku */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Aliran Buku
                </h3>
                <p className="text-gray-700 ml-7">{book.aliran}</p>
              </div>

              {/* Lokasi */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                  Lokasi
                </h3>
                <p className="text-gray-700 ml-7">{book.lokasi}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Penerbit */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-gray-600" />
                  Penerbit
                </h3>
                <p className="text-gray-700 ml-7">{book.penerbit}</p>
              </div>

              {/* Ilustrator */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-gray-600" />
                  Ilustrator
                </h3>
                <p className="text-gray-700 ml-7">{book.ilustrator}</p>
              </div>

              {/* Jenis Buku */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-600" />
                  Jenis Buku
                </h3>
                <p className="text-gray-700 ml-7">{book.jenis}</p>
              </div>

              {/* ISBN */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Hash className="w-5 h-5 mr-2 text-gray-600" />
                  ISBN
                </h3>
                <p className="text-gray-700 ml-7">{book.isbn}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}