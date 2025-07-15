/**
 * Sidebar Navigation Component
 * 
 * Purpose:
 * - Provides navigation between different library locations
 * - Shows active location highlighting
 * - Handles responsive mobile/desktop layouts
 * - Manages location-based filtering
 * 
 * Features:
 * - Location-based navigation with visual feedback
 * - Responsive design (fixed on desktop, overlay on mobile)
 * - Active state highlighting
 * - Back to landing page functionality
 * - Disabled state for unavailable features (Peta)
 * 
 * Access: Available on all book list pages
 * Navigation: Triggers route changes via onLocationChange callback
 */

import React from "react";
import { Book, MapPin, Home, Building2, ArrowLeft } from "lucide-react";

/**
 * Sidebar Component Props
 * @param {string} activeLocation - Currently active location filter
 * @param {function} onLocationChange - Callback for location changes
 * @param {function} onBackToLanding - Callback for returning to landing page
 */
export default function Sidebar({ activeLocation, onLocationChange, onBackToLanding }) {
  /**
   * Menu Items Configuration
   * 
   * Purpose: Defines all available navigation options
   * - Each item has unique ID, display label, and icon
   * - Icons from Lucide React for consistency
   * - Organized by location type (RW, Kelurahan offices)
   */
  const menuItems = [
    { id: "peta", label: "Peta", icon: MapPin },
    { id: "semua-buku", label: "Semua Buku", icon: Book },
    { id: "tbm-rw-01", label: "TBM RW 01", icon: Home },
    { id: "tbm-rw-02", label: "TBM RW 02", icon: Home },
    { id: "tbm-rw-03", label: "TBM RW 03", icon: Home },
    { id: "tbm-rw-04", label: "TBM RW 04", icon: Home },
    { id: "tbm-rw-05", label: "TBM RW 05", icon: Home },
    { id: "tbm-rw-06", label: "TBM RW 06", icon: Home },
    { id: "tbm-rw-07", label: "TBM RW 07", icon: Home },
    { id: "tbm-pendopo", label: "TBM Pendopo Kelurahan", icon: Building2 },
    { id: "tbm-kantor", label: "TBM Kantor Kelurahan", icon: Building2 },
  ];

  /**
   * Location Filter Mapping Function
   * 
   * Purpose: Converts menu item IDs to database location values
   * - Maps UI identifiers to actual database location names
   * - Handles special case for "all books" view
   * - Returns consistent location values for filtering
   * 
   * @param {string} itemId - Menu item identifier
   * @returns {string} - Database location value or 'all'
   */
  const getLocationFilter = (itemId) => {
    switch (itemId) {
      case "semua-buku":
        return "all";
      case "tbm-rw-01":
        return "TBM RW 01";
      case "tbm-rw-02":
        return "TBM RW 02";
      case "tbm-rw-03":
        return "TBM RW 03";
      case "tbm-rw-04":
        return "TBM RW 04";
      case "tbm-rw-05":
        return "TBM RW 05";
      case "tbm-rw-06":
        return "TBM RW 06";
      case "tbm-rw-07":
        return "TBM RW 07";
      case "tbm-pendopo":
        return "TBM Pendopo Kelurahan";
      case "tbm-kantor":
        return "TBM Kantor Kelurahan";
      default:
        return "all";
    }
  };

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-emerald-200 h-full relative z-20 shadow-lg">
      <div 
        className="flex items-center space-x-3 px-6 pt-6 cursor-pointer hover:bg-emerald-50 transition-colors duration-200 rounded-lg mx-2"
        onClick={onBackToLanding}
      >
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
          <Book className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-emerald-800 hover:text-emerald-900 transition-colors duration-200">
            Taman Baca Masyarakat
          </h1>
        </div>
      </div>

      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeLocation === getLocationFilter(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id !== "peta") {
                    onLocationChange(getLocationFilter(item.id));
                  }
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700 border-r-4 border-emerald-500 shadow-md"
                    : item.id === "peta" 
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
                disabled={item.id === "peta"}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-4 border-t border-emerald-200">
          <button
            onClick={onBackToLanding}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </aside>
  );
}