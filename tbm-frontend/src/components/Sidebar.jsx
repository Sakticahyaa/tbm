import React from "react";
import { Book, MapPin, Home, Building2 } from "lucide-react";

export default function Sidebar({ activeLocation, onLocationChange }) {
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

  const getLocationFilter = (itemId) => {
    switch (itemId) {
      case "peta":
        return "peta";
      case "semua-buku":
        return "semua-buku";
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
        return "";
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      {/* TBM Logo */}
      <div className="flex items-center space-x-3 px-6 pt-6">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
          <Book className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Taman Baca Masyarakat
          </h1>
        </div>
      </div>

      {/* Main Sidebar */}
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
                    ? "bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500"
                    : item.id === "peta" 
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-50"
                }`}
                disabled={item.id === "peta"}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}