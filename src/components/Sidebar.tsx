import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Book, MapPin } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/peta-tbm', label: 'Peta', icon: Map },
    { path: '/daftar-buku', label: 'Semua Buku', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20RW%2001', label: 'TBM RW 01', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20RW%2002', label: 'TBM RW 02', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20RW%2003', label: 'TBM RW 03', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20RW%2004', label: 'TBM RW 04', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20RW%2005', label: 'TBM RW 05', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20RW%2006', label: 'TBM RW 06', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20RW%2007', label: 'TBM RW 07', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20Joglo Mutiara', label: 'TBM Joglo Mutiara', icon: Book },
    { path: '/daftar-buku?lokasi=TBM%20Kantor%20Kelurahan', label: 'TBM Kantor Kelurahan', icon: Book },
  ];

  const isActive = (path: string) => {
    if (path === '/daftar-buku' && location.pathname === '/daftar-buku' && !location.search) {
      return true;
    }
    return location.pathname + location.search === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 lg:top-16 left-0 h-screen bg-white 
        border-r border-amber-400 z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 overflow-y-auto
      `}>
        <div className=" p-6 pt-20 lg:pt-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive(item.path)
                      ? 'bg-A1-Forest text-white font-medium'
                      : 'text-amber-700 hover:bg-A1-Forest hover:text-white'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;