import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';
import Filter from './components/Filter';
import Tablelist from './components/Tablelist';
import Bookdetail from './components/Bookdetail';
import { books as bookData } from './data/books';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeLocation, setActiveLocation] = useState('all');
  
  const [filters, setFilters] = useState({
    aliran: '',
    jenis: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Filter books by location
  const filteredBooksByLocation = activeLocation === 'all' 
    ? bookData 
    : bookData.filter(book => book.lokasi === activeLocation);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleLocationChange = (location) => {
    setActiveLocation(location);
    // Reset filters when changing location
    setFilters({ aliran: '', jenis: '' });
    setSearchTerm('');
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedBook(null);
  };

  const getPageTitle = () => {
    if (activeLocation === 'all') return 'Semua Buku';
    return activeLocation;
  };

  if (currentView === 'detail' && selectedBook) {
    return (
      <BookDetail 
        book={selectedBook} 
        onBack={handleBackToList}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeLocation={activeLocation}
        onLocationChange={handleLocationChange}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
            </div>
            
            <div className='flex gap-10 justify-between items-center mb-6'>
              <div className='flex-1'>
                <Filter filters={filters} onFilterChange={handleFilterChange} />
              </div>
              <div className="w-1/3">
                <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
              </div>
            </div>
            
            <div className="space-y-4">
              <Tablelist 
                books={filteredBooksByLocation} 
                filters={filters} 
                searchTerm={searchTerm}
                onBookClick={handleBookClick}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;