import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, BookOpen, Users, Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [bookCount, setBookCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchBookCount = async () => {
      const { count } = await supabase
        .from("buku")
        .select("*", { count: "exact", head: true });
      setBookCount(count || 0);
    };

    fetchBookCount();

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Animated Background for Hero only */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-000"></div>
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-A1-Cream/50"></div>
        </div>

        <div className="relative z-10 text-center text-A1-Forest px-4 sm:px-6 lg:px-8 ">
          <h1 className="bg-white px-2 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
            Taman Baca Masyarakat
          </h1>
          <button
            onClick={() => scrollToSection("cta")}
            className="group bg-A1-Forest font-serif hover:bg-A1-Cream text-white hover:text-A1-Forest hover:bg-opacity-50 px-16 py-2 rounded-lg text-lg font-normal transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <span className="group-hover:hidden">Mulai Baca Sekarang</span>
            <span className="hidden group-hover:inline">
              Mulai Baca Sekarang
            </span>
          </button>
        </div>
        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-8 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("about")}
            className="text-white/80 hover:text-white transition-colors"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </section>

      {/* Combined Background Section: About + Stats + CTA */}
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('/img/bglp.png')`,
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-white/20"></div>

        {/* Decorative Images - Background Layer with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          {/* About Section Decoratives */}
          <div 
            className="absolute -top-20 right-10 opacity-30 filter blur-sm"
            style={{
              transform: `translateY(${scrollY * 0.39}px)`,
            }}
          >
            <img src="/img/dec-lp-1.png" alt="Decorative element 1" className="h-32 w-32" />
          </div>
          <div 
            className="absolute bottom-[70%] left-10 opacity-40 blur-sm"
            style={{
              transform: `translateY(${scrollY * 0.19}px)`,
            }}
          >
            <img src="/img/dec-lp-2.png" alt="Decorative element 2" className="h-24 w-24" />
          </div>
          
          {/* Stats Section Decoratives */}
          <div 
            className="absolute top-[45%] right-10 opacity-25 filter blur-sm"
            style={{
              transform: `translateY(${scrollY * 0.21}px)`,
            }}
          >
            <img src="/img/dec-lp-3.png" alt="Decorative element 3" className="h-28 w-28" />
          </div>
          <div 
            className="absolute top-[50%] right-10 opacity-35"
            style={{
              transform: `translateY(${scrollY * -0.12}px)`,
            }}
          >
            <img src="/img/dec-lp-4.png" alt="Decorative element 4" className="h-20 w-20" />
          </div>
          
          {/* CTA Section Decoratives */}
          <div 
            className="absolute -bottom-40 left-10 opacity-30 filter"
            style={{
              transform: `translateY(${scrollY * -0.15}px)`,
            }}
          >
            <img src="/img/dec-lp-5.png" alt="Decorative element 5" className="h-16 w-16" />
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="relative py-20 pt-30 px-4 sm:px-6 lg:px-8 z-10">
          <div className="w-3/4 ml-[5%] text-left">
            <div className="flex justify-center mb-8"></div>
            <h2 className="bg-white px-2 justify-left text-3xl sm:text-4xl md:text-5xl font-semibold font-serif text-A1-Forest mb-8">
              Tingkatkan literasi Indonesia
            </h2>
            <p className="text-lg text-black leading-relaxed mx-auto">
              Taman Baca Masyarakat (TBM) di Kelurahan Bugel, Salatiga,
              merupakan salah satu bentuk inisiatif dalam meningkatkan literasi
              masyarakat setempat. TBM ini biasanya berlokasi secara strategis
              di lingkungan permukiman warga. Setiap RW (Rukun Warga) di
              Kelurahan Bugel masing-masing memiliki satu TBM. TBM ini
              menyediakan beragam bahan bacaan seperti buku pendidikan,
              anak-anak, fiksi, pengetahuan umum, dan sebagainya. Setiap TBM
              dikelola oleh relawan atau tokoh masyarakat di masing-masing RW.
              Seluruh lapisan masyarakat memiliki kesempatan untuk mengakses dan
              meminjam buku-buku yang tersedia di TBM tersebut.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div id="stats" className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative">
              <div className="text-8xl font-[serif] sm:text-9xl md:text-[12rem] font-bold text-amber-800 mb-4 animate-count-up">
                {bookCount}
              </div>
              <p className="text-lg text-black text-inter max-w-md mx-auto">
                Jumlah buku terdata di website Taman Baca Masyarakat
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div id="cta" className="relative py-20 pb-40 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Link
              to="/daftar-buku"
              className="group font-serif bg-A1-Forest hover:bg-A1-Cream text-white hover:text-A1-Forest hover:ring-2 hover:ring-A1-Forest hover:bg-opacity-50 px-16 py-2 rounded-lg text-lg font-normal transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <span className="group-hover:hidden">Mulai Baca Sekarang</span>
              <span className="hidden group-hover:inline">
                Mulai Baca Sekarang
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;