import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Tablelist from './components/Tablelist';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Semua Buku</h2>
            </div>
            <div className='flex gap-10 justify-between items-center mb-6'>
              <div className=''>
                <Filter />
              </div>
              <div className="w-80">
                <SearchBar />
              </div>
            </div>
            
            <div className="space-y-4">
              <Tablelist />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;