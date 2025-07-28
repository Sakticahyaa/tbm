import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ChevronUp, ChevronDown, MoreVertical, Menu } from 'lucide-react';
import { supabase, Book } from '../lib/supabase';
import Sidebar from '../components/Sidebar';

const BookListPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Book>('judul_buku');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [aliranFilter, setAliranFilter] = useState('');
  const [jenisFilter, setJenisFilter] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const locationFilter = searchParams.get('lokasi') || '';

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchTerm, sortField, sortDirection, aliranFilter, jenisFilter, locationFilter]);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('buku')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBooks = () => {
    let filtered = books.filter(book => {
      const matchesSearch = !searchTerm || 
        Object.values(book).some(value => 
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesAliran = !aliranFilter || book.aliran_buku === aliranFilter;
      const matchesJenis = !jenisFilter || book.jenis_buku === jenisFilter;
      const matchesLocation = !locationFilter || book.lokasi_buku === locationFilter;
      
      return matchesSearch && matchesAliran && matchesJenis && matchesLocation;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || '';
      const bValue = b[sortField]?.toString().toLowerCase() || '';
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setFilteredBooks(filtered);
  };

  const handleSort = (field: keyof Book) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (book: Book) => {
    const slug = book.judul_buku.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    navigate(`/buku/${slug}`, { state: { book } });
  };

  const getUniqueValues = (field: keyof Book) => {
    return [...new Set(books.map(book => book[field]))].filter(Boolean);
  };

  const getPageTitle = () => {
    if (locationFilter) {
      return locationFilter;
    }
    return 'Semua Buku';
  };

  const SortIcon = ({ field }: { field: keyof Book }) => {
    if (sortField !== field) {
      return (
        <div className="flex flex-col">
          <ChevronUp className="h-3 w-3 text-gray-400" />
          <ChevronDown className="h-3 w-3 text-gray-400 -mt-1" />
        </div>
      );
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-amber-600" /> : 
      <ChevronDown className="h-4 w-4 text-amber-600" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Memuat data buku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="flex pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 p-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 bg-white rounded-lg shadow-md border border-amber-200 hover:bg-amber-50 transition-colors"
          >
            <Menu className="h-6 w-6 text-amber-700" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-amber-900 mb-4">{getPageTitle()}</h1>
            
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-500" />
                <input
                  type="text"
                  placeholder="Cari buku..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={aliranFilter}
                onChange={(e) => setAliranFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Semua Aliran</option>
                {getUniqueValues('aliran_buku').map(aliran => (
                  <option key={aliran} value={aliran}>{aliran}</option>
                ))}
              </select>
              
              <select
                value={jenisFilter}
                onChange={(e) => setJenisFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Semua Jenis</option>
                {getUniqueValues('jenis_buku').map(jenis => (
                  <option key={jenis} value={jenis}>{jenis}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-amber-900 cursor-pointer hover:bg-amber-200 transition-colors"
                      onClick={() => handleSort('judul_buku')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Judul</span>
                        <SortIcon field="judul_buku" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-amber-900 cursor-pointer hover:bg-amber-200 transition-colors"
                      onClick={() => handleSort('penulis_buku')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Penulis</span>
                        <SortIcon field="penulis_buku" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-amber-900 cursor-pointer hover:bg-amber-200 transition-colors"
                      onClick={() => handleSort('aliran_buku')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Aliran</span>
                        <SortIcon field="aliran_buku" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-amber-900 cursor-pointer hover:bg-amber-200 transition-colors"
                      onClick={() => handleSort('jenis_buku')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Jenis</span>
                        <SortIcon field="jenis_buku" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-amber-900 cursor-pointer hover:bg-amber-200 transition-colors"
                      onClick={() => handleSort('lokasi_buku')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Lokasi</span>
                        <SortIcon field="lokasi_buku" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-amber-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200">
                  {filteredBooks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="text-amber-600">
                          <div className="text-6xl mb-4">📚</div>
                          <p className="text-lg font-medium text-amber-800">Tidak ada data</p>
                          <p className="text-amber-600">Tidak ada buku yang ditemukan dengan kriteria pencarian ini.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map((book) => (
                      <tr 
                        key={book.id}
                        onClick={() => handleRowClick(book)}
                        className="hover:bg-amber-50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{book.judul_buku}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.penulis_buku}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.aliran_buku}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.jenis_buku}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.lokasi_buku}</td>
                        <td className="px-6 py-4 text-center">
                          <MoreVertical className="h-5 w-5 text-amber-600 mx-auto" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-amber-700">
            Menampilkan {filteredBooks.length} dari {books.length} buku
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListPage;