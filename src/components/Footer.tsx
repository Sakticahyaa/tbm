import React from 'react';
import { BookOpen, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-100 to-orange-100 border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-amber-700" />
              <span className="text-xl font-semibold text-amber-800">Taman Baca Masyarakat</span>
            </div>
            <p className="text-amber-700 leading-relaxed">
              Platform digital untuk memetakan dan mendata koleksi buku di Taman Baca Masyarakat 
              di Bugel, Sidorejo, Salatiga. Membantu masyarakat menemukan buku dan lokasi TBM terdekat.
            </p>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-amber-800 mb-4">Ikuti Kami</h3>
            <a 
              href="https://www.instagram.com/kknsadakkinang/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>@kknsadakkinang</span>
            </a>
          </div>

          {/* Empty column for spacing on larger screens */}
          <div className="lg:col-span-1"></div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-amber-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-amber-700 text-sm">
              © 2025 KKN Sadak Kinang. All rights reserved.
            </p>
            <p className="text-amber-700 text-sm">
              KKN-PPM UGM Sidorejo Salatiga
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;