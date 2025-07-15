import React, { useState, useEffect } from 'react';
import { ChevronDown, Book, Users, Target, Lightbulb, Star, Globe } from 'lucide-react';
import { useBookCount } from '../hooks/useBookCount';

export default function LandingPage({ onStartReading }) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { bookCount, loading: bookCountLoading } = useBookCount();

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

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Custom CSS for animations */}
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
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

        {/* Floating Background Elements */}
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

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-emerald-800 mb-8 leading-tight">
            Taman Baca Masyarakat
          </h1>
          
          <div className="mb-12">
            <button
              onClick={onStartReading}
              className="floating-button px-8 py-4 bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Mulai baca sekarang
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-emerald-700 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-medium">Scroll untuk melihat lebih</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 dynamic-gradient text-white overflow-hidden">
        {/* Floating Icons */}
        <FloatingIcon icon={Book} className="top-10 left-10" delay={0} />
        <FloatingIcon icon={Users} className="top-20 right-20" delay={1} />
        <FloatingIcon icon={Target} className="bottom-20 left-20" delay={2} />
        <FloatingIcon icon={Star} className="bottom-10 right-10" delay={3} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Tingkatkan literasi Indonesia</h2>
              <p className="text-lg leading-relaxed opacity-90">
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
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Book className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-300 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-400 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-20 dynamic-gradient text-white overflow-hidden">
        {/* Floating Icons */}
        <FloatingIcon icon={Lightbulb} className="top-16 left-16" delay={0.5} />
        <FloatingIcon icon={Globe} className="top-32 right-16" delay={1.5} />
        <FloatingIcon icon={Star} className="bottom-16 left-32" delay={2.5} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-8xl font-bold mb-4">
              {bookCountLoading ? (
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mr-4"></div>
                  <span className="text-6xl">Loading...</span>
                </div>
              ) : (
                bookCount
              )}
            </h2>
            <p className="text-xl opacity-90">Jumlah buku terdata di website Taman Baca Masyarakat</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 dynamic-gradient text-white overflow-hidden ripple-effect">
        {/* Floating Icons */}
        <FloatingIcon icon={Book} className="top-10 left-10" delay={1} />
        <FloatingIcon icon={Users} className="bottom-10 right-10" delay={2} />
        <FloatingIcon icon={Target} className="top-20 right-20" delay={3} />
        <FloatingIcon icon={Globe} className="bottom-20 left-20" delay={0} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <button
              onClick={onStartReading}
              className="floating-button px-12 py-6 bg-white text-emerald-700 font-bold rounded-lg shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-xl"
            >
              Mulai baca sekarang
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}