export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">SS</span>
          </div>
        </div>
      </div>
    </header>
  );
}