import React from 'react';
import { MapPin, Construction } from 'lucide-react';

const BookMapPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-16">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 text-center">
            <MapPin className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
              Peta TBM
            </h1>
            <p className="text-amber-700">Peta lokasi Taman Baca Masyarakat di Bugel, Sidorejo, Salatiga</p>
          </div>

          {/* Coming Soon Content */}
          <div className="p-12 text-center">
            <Construction className="h-24 w-24 text-amber-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Segera Hadir</h2>
            <p className="text-amber-700 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Fitur peta interaktif sedang dalam tahap pengembangan. Nantinya Anda dapat melihat 
              lokasi seluruh Taman Baca Masyarakat di Bugel, Sidorejo, Salatiga beserta informasi 
              koleksi buku di setiap lokasi.
            </p>
            
            {/* TBM Locations Preview */}
            <div className="bg-amber-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-amber-900 mb-4">Lokasi TBM yang akan dipetakan:</h3>
              <ul className="text-left space-y-2 text-amber-700">
                <li>• TBM RW 01</li>
                <li>• TBM RW 02</li>
                <li>• TBM RW 03</li>
                <li>• TBM RW 04</li>
                <li>• TBM RW 05</li>
                <li>• TBM RW 06</li>
                <li>• TBM RW 07</li>
                <li>• TBM Joglo Mutiara</li>
                <li>• TBM Kantor Kelurahan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMapPage;