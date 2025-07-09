import React, { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Semua Buku");

  const menuItems = [
    { id: "peta", label: "Peta", icon: "📍" },
    { id: "semua-buku", label: "Semua Buku", icon: "📚" },
    { id: "tbm-rw-01", label: "TBM RW 01", icon: "🏘️" },
    { id: "tbm-rw-02", label: "TBM RW 02", icon: "🏘️" },
    { id: "tbm-rw-03", label: "TBM RW 03", icon: "🏘️" },
    { id: "tbm-rw-04", label: "TBM RW 04", icon: "🏘️" },
    { id: "tbm-rw-05", label: "TBM RW 05", icon: "🏘️" },
    { id: "tbm-rw-06", label: "TBM RW 06", icon: "🏘️" },
    { id: "tbm-rw-07", label: "TBM RW 07", icon: "🏘️" },
    { id: "tbm-pendopo", label: "TBM Pendopo Kelurahan", icon: "🏛️" },
    { id: "tbm-kantor", label: "TBM Kantor Kelurahan", icon: "🏢" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">

      {/* TBM Logo */}
      <div className="flex items-center space-x-3 px-6 pt-6">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.082 9.254 4.5 7.5 4.5c-1.682 0-3.256.479-4.5 1.253v13C3.274 18.51 4.792 18 6.25 18c1.4 0 2.6.467 3.75 1.253M15 5.25c1.6 0 3.2.484 4.5 1.253v13C18.64 18.75 17.1 18.25 15.5 18.25c-1.6 0-3.12.5-4.5 1.253z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-l font-semibold text-gray-800">
            Taman Baca Masyarakat
          </h1>
        </div>
      </div>

      {/* Main Sidebar */}
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeItem === item.label
                  ? "bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
