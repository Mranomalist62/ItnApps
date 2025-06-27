import React, { useState } from 'react';

const retreatData = [
    {
        id: 1,
        name: 'Yoga Bliss Bali',
        location: 'Bali',
        category: 'Yoga & Meditation',
        price: 1200,
    },
    {
        id: 2,
        name: 'Jungle Spa Retreat',
        location: 'Ubud',
        category: 'Spa & Detox',
        price: 900,
    },
    {
        id: 3,
        name: 'Cultural Zen Yogyakarta',
        location: 'Yogyakarta',
        category: 'Cultural & Wellness',
        price: 800,
    },
    // Tambahkan lebih banyak data dummy jika perlu
    ];

    const Retreat = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const filteredRetreats = retreatData.filter((retreat) => {
        const matchesSearch = retreat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = location === '' || retreat.location === location;
        const matchesCategory = category === '' || retreat.category === category;
        const matchesPrice =
        priceRange === '' ||
        (priceRange === 'Low' && retreat.price < 1000) ||
        (priceRange === 'Medium' && retreat.price >= 1000 && retreat.price <= 1500) ||
        (priceRange === 'High' && retreat.price > 1500);

        return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Title */}
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800">Explore Our Retreats</h1>
            <p className="text-gray-600 mt-2">
            Discover a wide range of wellness experiences tailored to your needs and preferences.
            </p>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
            <input
            type="text"
            name="search"
            placeholder="Search retreats, activities, or locations..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-gray-400">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Location */}
            <div className="relative">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
                <select
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                >
                <option value="">All Locations</option>
                <option value="Bali">Bali</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Ubud">Ubud</option>
                <option value="Seminyak">Seminyak</option>
                <option value="Canggu">Canggu</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                📍
                </div>
            </div>
            </div>

            {/* Category */}
            <div className="relative">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="relative">
                <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                >
                <option value="">All Categories</option>
                <option value="Yoga & Meditation">Yoga & Meditation</option>
                <option value="Spa & Detox">Spa & Detox</option>
                <option value="Adventure & Wellness">Adventure & Wellness</option>
                <option value="Yoga & Surfing">Yoga & Surfing</option>
                <option value="Cultural & Wellness">Cultural & Wellness</option>
                <option value="Luxury & Detox">Luxury & Detox</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                🧘
                </div>
            </div>
            </div>

            {/* Price Range */}
            <div className="relative">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="relative">
                <select
                id="price"
                name="price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                >
                <option value="">All Prices</option>
                <option value="Low">Low (Under $1000)</option>
                <option value="Medium">Medium ($1000-$1500)</option>
                <option value="High">High (Above $1500)</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                💵
                </div>
            </div>
            </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
            <button
            className="text-sm text-gray-500 hover:underline"
            onClick={() => {
                setSearchTerm('');
                setLocation('');
                setCategory('');
                setPriceRange('');
                setIsFilterApplied(false);
            }}
            >
            Clear all filters
            </button>
            <button
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-md flex items-center gap-2 hover:from-blue-700 hover:to-teal-600 transition-all duration-300"
            onClick={() => {
                if (searchTerm.trim() !== '') {
                setIsFilterApplied(true);
                } else {
                alert("Please enter a search keyword first.");
                }
            }}
            >
            Apply Filters
            </button>
        </div>

        {/* Result Section */}
        {isFilterApplied && searchTerm.trim() !== '' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRetreats.length > 0 ? (
                filteredRetreats.map((retreat) => (
                <div key={retreat.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="font-semibold text-lg text-gray-800">{retreat.name}</h3>
                    <p className="text-sm text-gray-600">Location: {retreat.location}</p>
                    <p className="text-sm text-gray-600">Category: {retreat.category}</p>
                    <p className="text-sm text-gray-800 mt-2 font-medium">${retreat.price}</p>
                </div>
                ))
            ) : (
                <p className="text-gray-500">No retreats found matching your criteria.</p>
            )}
            </div>
        )}
        </div>
    );
};

export default Retreat;
