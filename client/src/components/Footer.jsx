    import React from 'react';

    const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="md:col-span-2">
                <h1 className="text-2xl font-bold mb-4">Serenity Retreats</h1>
                <p className="mb-6">
                Discover wellness retreats that transform your mind, body, and soul. Begin your journey to wellness today.
                </p>
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-600">Home</a></li>
                <li><a href="#" className="hover:text-gray-600">Retreats</a></li>
                <li><a href="#" className="hover:text-gray-600">Destinations</a></li>
                <li><a href="#" className="hover:text-gray-600">Contact & FAQ</a></li>
                <li><a href="#" className="hover:text-gray-600">Find My Retreat</a></li>
                </ul>
            </div>

            {/* Popular Destinations */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Popular Destinations</h2>
                <ul className="space-y-2">
                <li>Bali, Indonesia</li>
                <li>Yogyakarta, Indonesia</li>
                <li>Ubud, Bali</li>
                <li>Seminyak, Bali</li>
                </ul>
            </div>

            {/* Contact Us */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                <address className="not-italic space-y-2">
                <p>Jl. Wellness No. 123, Ubud, Bali, Indonesia</p>
                <p>+62 123 4567 890</p>
                <p>info@serenityretreats.com</p>
                </address>
            </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h2>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border border-gray-300 rounded-md flex-grow"
                />
                <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700">
                Subscribe
                </button>
            </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-6 border-t border-gray-300 text-center">
            <p>© 2025 Serenity Retreats. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
    };

    export default Footer;