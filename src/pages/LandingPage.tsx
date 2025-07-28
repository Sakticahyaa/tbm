import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen, Users, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [bookCount, setBookCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchBookCount = async () => {
      const { count } = await supabase
        .from('buku')
        .select('*', { count: 'exact', head: true });
      setBookCount(count || 0);
    };

    fetchBookCount();

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 to-orange-900/70"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
            Taman Baca Masyarakat
          </h1>
          <button
            onClick={() => scrollToSection('cta')}
            className="group bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <span className="group-hover:hidden">Mulai Baca Sekarang</span>
            <span className="hidden group-hover:inline">Baca Sekarang</span>
          </button>

          {/* Floating Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ChevronDown className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-amber-200 rounded-full">
              <BookOpen className="h-12 w-12 text-amber-700" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-8">
            Tingkatkan literasi Indonesia
          </h2>
          <p className="text-lg text-amber-800 leading-relaxed max-w-3xl mx-auto">
            Flofa adalah platform pendataan penyakit pada hewan dan tanaman di Kelurahan Bugel, Salatiga. 
            Selain pendataan penyakit, Flofa juga memberikan informasi lain seperti gejala dan cara penanganannya. 
            Flofa membantu digitalisasi proses pendataan dengan mudah dan cepat. Selain sebagai pendataan, 
            Flofa juga berperan sebagai pemantauan kondisi hewan dan tanaman di Kelurahan Bugel.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <Users className="h-24 w-24 text-amber-600" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <Star className="h-16 w-16 text-orange-600" />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative">
            <div className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-amber-800 mb-4 animate-count-up">
              {bookCount}
            </div>
            <p className="text-lg text-amber-700 max-w-md mx-auto">
              Jumlah buku terdata di website Taman Baca Masyarakat
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 opacity-20">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg transform rotate-45"></div>
        </div>
        <div className="absolute bottom-20 right-20 opacity-20">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Link
            to="/daftar-buku"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-12 py-6 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Mulai Baca Sekarang
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-1/4 opacity-30">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-10 right-1/4 opacity-30">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-red-300 rounded-full animate-pulse animation-delay-1000"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;