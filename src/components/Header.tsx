import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-semibold text-gray-900 dark:text-white">EventHub</span>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? 'text-sm font-medium text-blue-600 dark:text-blue-400'
                : 'text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              isActive
                ? 'text-sm font-medium text-blue-600 dark:text-blue-400'
                : 'text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }
          >
            My Bookings
          </NavLink>
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>
    </header>
  );
}
