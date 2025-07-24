/**
 * Header Component
 * 
 * Purpose:
 * - Displays user profile information in the top navigation
 * - Provides consistent header across all pages
 * - Shows user initials in a styled avatar
 * 
 * Features:
 * - Responsive design with backdrop blur effect
 * - User avatar with initials
 * - Consistent styling with emerald color scheme
 * 
 * Access: Used in BookListPage and BookDetailPage
 * Future: Could be extended with user menu, notifications, etc.
 */

/**
 * Header Component
 * 
 * Currently displays a simple user profile section
 * Can be extended with additional header functionality like:
 * - User dropdown menu
 * - Notifications
 * - Global search
 * - Theme toggle
 */
export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-emerald-200 relative z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-medium text-sm">SS</span>
          </div>
        </div>
      </div>
    </header>
  );
}