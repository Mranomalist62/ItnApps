import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ isLoggedIn }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 bg-white shadow-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
                <Link
                to="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
                >
                Serenity Retreats
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Home</Link>
                <Link to="/retreats" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">Retreats</Link>
                <Link to="/destinations" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Destinations</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">About Us</Link>
                <Link to="/find-my-retreat" className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">Find My Retreat</Link>
            </div>

            {/* Sign In / My Profile Button */}
            <div className="hidden md:block">
            {isLoggedIn ? (
                <Link
                    to="/profile"
                    className="flex items-center text-black hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors duration-200"
                >
                    <FaUserCircle className="mr-2" size={20} />
                    My Profile
                </Link>
                ) : (
                <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-teal-600 transition-all duration-200 shadow-sm"
                >
                    Sign In
                </Link>
                )}      
                </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
                <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                        isMobileMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                    />
                </svg>
                </button>
            </div>
            </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/retreats" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium">Retreats</Link>
            <Link to="/destinations" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium">Destinations</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium">Contact & FAQ</Link>
            <Link to="/find-my-retreat" className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium">Find My Retreat</Link>
            {isLoggedIn ? (
                <Link
                to="/profile"
                className="flex items-center w-full text-left bg-gradient-to-r from-green-600 to-teal-500 text-white px-3 py-2 rounded-md text-base font-medium hover:from-green-700 hover:to-teal-600 transition-all duration-200"
                >
                <FaUserCircle className="mr-2" size={20} />
                My Profile
                </Link>
            ) : (
                <Link
                to="/login"
                className="block w-full text-left bg-gradient-to-r from-blue-600 to-teal-500 text-white px-3 py-2 rounded-md text-base font-medium hover:from-blue-700 hover:to-teal-600 transition-all duration-200"
                >
                Sign In
                </Link>
            )}
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
