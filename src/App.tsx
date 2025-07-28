import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import BookMapPage from './pages/BookMapPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/daftar-buku" element={<BookListPage />} />
          <Route path="/buku/:slug" element={<BookDetailPage />} />
          <Route path="/peta-tbm" element={<BookMapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;