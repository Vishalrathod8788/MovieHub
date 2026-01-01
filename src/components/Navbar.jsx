import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MovieHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              Search
            </Link>
            <Link 
              to="/explore" 
              className="hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              Explore
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-800">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="hover:text-blue-300 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                className="hover:text-blue-300 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <Link 
                to="/explore" 
                className="hover:text-blue-300 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;