import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-A1-Forest shadow-grey-300 opacity-[80%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className='flex h-10'>
              <img src='/img/tbmLogo.png' alt='logo tbm' className=''></img>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isHome ? (
              <>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-amber-900 hover:text-A1-Forest transition-colors cursor-pointer"
                >
                  Beranda
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-amber-900 hover:text-A1-Forest transition-colors cursor-pointer"
                >
                  Tentang
                </button>
                <button 
                  onClick={() => scrollToSection('stats')}
                  className="text-amber-900 hover:text-A1-Forest transition-colors cursor-pointer"
                >
                  Data
                </button>
                <button 
                  onClick={() => scrollToSection('cta')}
                  className="text-amber-900 hover:text-A1-Forest transition-colors cursor-pointer"
                >
                  Mulai Baca
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-amber-900 hover:text-A1-Forest transition-colors">
                  Beranda
                </Link>
                <Link to="/daftar-buku" className="text-amber-900 hover:text-A1-Forest transition-colors">
                  Daftar Buku
                </Link>
                <Link to="/peta-tbm" className="text-amber-900 hover:text-A1-Forest transition-colors">
                  Peta TBM
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-amber-900 hover:text-A1-Forest transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-A1-Forest">
            <nav className="flex flex-col space-y-2">
              {isHome ? (
                <>
                  <button 
                    onClick={() => scrollToSection('hero')}
                    className="text-left px-2 py-1 text-amber-900 hover:text-A1-Forest transition-colors"
                  >
                    Beranda
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left px-2 py-1 text-amber-900 hover:text-A1-Forest transition-colors"
                  >
                    Tentang
                  </button>
                  <button 
                    onClick={() => scrollToSection('stats')}
                    className="text-left px-2 py-1 text-amber-900 hover:text-A1-Forest transition-colors"
                  >
                    Data
                  </button>
                  <button 
                    onClick={() => scrollToSection('cta')}
                    className="text-left px-2 py-1 text-amber-900 hover:text-A1-Forest transition-colors"
                  >
                    Mulai Baca
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/" 
                    className="px-2 py-1 text-amber-900 hover:text-A1-Forest transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Beranda
                  </Link>
                  <Link 
                    to="/daftar-buku" 
                    className="px-2 py-1 text-amber-900 hover:text-A1-Forest transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Daftar Buku
                  </Link>
                  <Link 
                    to="/peta-tbm" 
                    className="px-2 py-1 text-amber-900 hover:text-A1-Forest transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Peta TBM
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;