import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, BookOpen, MapPin, Building, Palette, Barcode } from 'lucide-react';
import { Book } from '../lib/supabase';

const BookDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book as Book;

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-lg font-medium text-amber-800 mb-4">Buku tidak ditemukan</p>
          <button
            onClick={() => navigate('/daftar-buku')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Kembali ke Daftar Buku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-16">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/daftar-buku')}
          className="flex items-center space-x-2 mb-6 text-amber-700 hover:text-amber-900 transition-colors bg-white px-4 py-2 rounded-lg shadow-md border border-amber-200 hover:bg-amber-50"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Kembali ke daftar buku</span>
        </button>

        {/* Book Detail Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
              {book.judul_buku}
            </h1>
            <div className="flex items-center text-amber-700">
              <User className="h-5 w-5 mr-2" />
              <span className="text-lg">{book.penulis_buku}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Synopsis */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-amber-600 mr-2" />
                <h2 className="text-xl font-semibold text-amber-900">Sinopsis</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {book.sinopsis_buku || 'Sinopsis tidak tersedia.'}
              </p>
            </div>

            {/* Book Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aliran Buku */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center mb-2">
                  <Palette className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-amber-900">Aliran Buku</h3>
                </div>
                <p className="text-gray-700">{book.aliran_buku}</p>
              </div>

              {/* Penerbit */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center mb-2">
                  <Building className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-orange-900">Penerbit</h3>
                </div>
                <p className="text-gray-700">{book.penerbit_buku || 'Tidak tersedia'}</p>
              </div>

              {/* Lokasi */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-amber-900">Lokasi</h3>
                </div>
                <p className="text-gray-700">{book.lokasi_buku}</p>
              </div>

              {/* Ilustrator */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center mb-2">
                  <Palette className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-orange-900">Ilustrator</h3>
                </div>
                <p className="text-gray-700">{book.ilustrator_buku || 'Tidak tersedia'}</p>
              </div>

              {/* Jenis Buku */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-semibold text-amber-900">Jenis Buku</h3>
                </div>
                <p className="text-gray-700">{book.jenis_buku}</p>
              </div>

              {/* ISBN */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center mb-2">
                  <Barcode className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-orange-900">ISBN</h3>
                </div>
                <p className="text-gray-700 font-mono">{book.isbn || 'Tidak tersedia'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;