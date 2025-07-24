/**
 * Landing Page Component
 * 
 * Purpose:
 * - Serves as the main entry point for users
 * - Displays hero section with call-to-action
 * - Shows dynamic book count from database
 * - Provides navigation to start browsing books
 * 
 * Features:
 * - Parallax scrolling effects
 * - Animated background elements
 * - Dynamic gradient animations
 * - Responsive design for all screen sizes
 * - Real-time book count from Supabase
 * 
 * Access: Available at "/" route
 * Navigation: Redirects to "/semua-buku" when user clicks "Mulai baca sekarang"
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Book, Users, Target, Lightbulb, Star, Globe } from 'lucide-react';
import { useBookCount } from '../hooks/useBookCount';

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { bookCount, loading: bookCountLoading } = useBookCount();

  /**
   * Effect Hook for Scroll and Mouse Tracking
   * 
   * Purpose: Enables parallax effects and interactive animations
   * - Tracks scroll position for parallax background movement
   * - Tracks mouse position for floating element interactions
   * 
   * Cleanup: Removes event listeners on component unmount
   */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  /**
   * Floating Icon Component
   * 
   * Purpose: Creates animated floating icons in the background
   * Props:
   * - icon: Lucide React icon component
   * - className: Positioning classes
   * - delay: Animation delay in seconds
   */
  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute ${className} opacity-20`}
      style={{
        transform: `translateY(${Math.sin(Date.now() * 0.001 + delay) * 10}px)`,
        animation: `float 6s ease-in-out infinite ${delay}s`
      }}
    >
      <Icon className="w-12 h-12 text-emerald-600" />
    </div>
  );

  /**
   * Navigation Handler
   * 
   * Purpose: Redirects user to book listing page
   * Target: "/semua-buku" route (shows all books)
   */
  const handleStartReading = () => {
    navigate('/semua-buku');
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Custom CSS Animations - Inline styles for component-specific animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes buttonFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .floating-button {
          animation: buttonFloat 3s ease-in-out infinite;
        }
        
        .dynamic-gradient {
          background: linear-gradient(-45deg, #10b981, #059669, #047857, #065f46);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        .ripple-effect {
          position: relative;
          overflow: hidden;
        }
        
        .ripple-effect::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .ripple-effect:hover::before {
          width: 300px;
          height: 300px;
        }
      `}</style>

      {/* Hero Section - Main landing area with parallax background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background - Moves slower than scroll for depth effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-white/70"></div>
        </div>

        {/* Interactive Floating Elements - Respond to mouse movement */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-16 h-16 bg-emerald-300 rounded-full opacity-40"
            style={{
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-40 left-20 w-12 h-12 bg-emerald-400 rounded-full opacity-50"
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
            }}
          ></div>
        </div>

        {/* Hero Content - Main title and CTA button */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-emerald-800 mb-8 leading-tight">
            Taman Baca Masyarakat
          </h1>
          
          <div className="mb-12">
            <button
              onClick={handleStartReading}
              className="floating-button px-6 py-3 md:px-8 md:py-4 bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-base md:text-lg"
            >
              Mulai baca sekarang
            </button>
          </div>
        </div>

        {/* Scroll Indicator - Animated prompt to scroll down */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-emerald-700 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm mb-2 font-medium">Scroll untuk melihat lebih</span>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </section>

      {/* About Section - Information about the library system */}
      <section className="relative py-16 md:py-20 dynamic-gradient text-white overflow-hidden">
        {/* Floating Background Icons */}
        <FloatingIcon icon={Book} className="top-10 left-10" delay={0} />
        <FloatingIcon icon={Users} className="top-20 right-20" delay={1} />
        <FloatingIcon icon={Target} className="bottom-20 left-20" delay={2} />
        <FloatingIcon icon={Star} className="bottom-10 right-10" delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Tingkatkan literasi Indonesia</h2>
              <p className="text-base md:text-lg leading-relaxed opacity-90">
                Flofa adalah platform pendataan penyakit pada hewan dan tanaman di 
                Kelurahan Bugel, Salatiga. Selain pendataan penyakit, Flofa juga 
                memberikan informasi lain seperti gejala dan cara penanganannya. Flofa 
                membantu digitalisasi proses pendataan dengan mudah dan cepat. Selain 
                sebagai pendataan, Flofa juga berperan sebagai pemantauan kondisi hewan 
                dan tanaman di Kelurahan Bugel.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Book className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-emerald-300 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-4 h-4 md:w-6 md:h-6 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Dynamic book count display */}
      <section className="relative py-16 md:py-20 dynamic-gradient text-white overflow-hidden">
        {/* Floating Background Icons */}
        <FloatingIcon icon={Lightbulb} className="top-16 left-16" delay={0.5} />
        <FloatingIcon icon={Globe} className="top-32 right-16" delay={1.5} />
        <FloatingIcon icon={Star} className="bottom-16 left-32" delay={2.5} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-8 md:mb-12">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4">
              {bookCountLoading ? (
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-8 w-8 md:h-16 md:w-16 border-b-4 border-white mr-4"></div>
                  <span className="text-2xl md:text-4xl lg:text-6xl">Loading...</span>
                </div>
              ) : (
                bookCount
              )}
            </h2>
            <p className="text-base md:text-xl opacity-90">Jumlah buku terdata di website Taman Baca Masyarakat</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Last call to action before footer */}
      <section className="relative py-16 md:py-20 dynamic-gradient text-white overflow-hidden ripple-effect">
        {/* Floating Background Icons */}
        <FloatingIcon icon={Book} className="top-10 left-10" delay={1} />
        <FloatingIcon icon={Users} className="bottom-10 right-10" delay={2} />
        <FloatingIcon icon={Target} className="top-20 right-20" delay={3} />
        <FloatingIcon icon={Globe} className="bottom-20 left-20" delay={0} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-8 md:mb-12">
            <button
              onClick={handleStartReading}
              className="floating-button px-8 py-4 md:px-12 md:py-6 bg-white text-emerald-700 font-bold rounded-lg shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-lg md:text-xl"
            >
              Mulai baca sekarang
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}