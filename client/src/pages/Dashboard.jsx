import React from 'react';

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Top Bar with Profile - Fixed to avoid navbar overlap */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
            <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Sarah!</p>
            </div>
            
            {/* Compact Profile */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-full shadow-xs border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium">
                SJ
            </div>
            <div className="pr-2">
                <p className="text-sm font-medium text-gray-700">Sarah Johnson</p>
                <p className="text-xs text-gray-400">sarah.j@example.com</p>
            </div>
            </div>
        </div>

        {/* Main Content Grid with top padding */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-10">
            {/* First Column - Navigation */}
            <div className="lg:col-span-1 space-y-6">
            <section className="bg-white p-5 rounded-xl shadow-sm sticky top-6">
                <h3 className="text-gray-700 font-medium mb-4">Menu</h3>
                <ul className="space-y-2">
                <NavItem icon="📊" label="Dashboard" active={false} />
                <NavItem icon="📅" label="My Bookings" active={true} />
                <NavItem icon="❤️" label="Saved Retreats" active={false} />
                <NavItem icon="⚙️" label="Settings" active={false} />
                </ul>
            </section>
            </div>

            {/* Second Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Retreat Card */}
            <section className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
                <h3 className="text-gray-700 font-medium mb-3">Upcoming Retreat</h3>
                <h4 className="font-medium text-gray-800 mb-2">Jungle Harmony Retreat</h4>
                <DetailItem icon="📍" text="Ubud, Bali" />
                <DetailItem icon="📅" text="Jun 15-22, 2023" />
                <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                    View Details
                </button>
                <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50">
                    Add to Calendar
                </button>
                </div>
            </section>

            {/* Saved Retreats */}
            <section className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-700 font-medium">Saved Retreats</h3>
                <button className="text-blue-500 text-sm hover:text-blue-700 flex items-center gap-1">
                    View all <span>→</span>
                </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RetreatCard 
                    name="Mountain Serenity" 
                    location="Yogyakarta" 
                    price="$950" 
                    emoji="🏔️" 
                />
                <RetreatCard 
                    name="Beachfront Yoga" 
                    location="Canggu" 
                    price="$1100" 
                    emoji="🏖️" 
                />
                <RetreatCard 
                    name="Forest Meditation" 
                    location="Ubud" 
                    price="$850" 
                    emoji="🌲" 
                />
                <RetreatCard 
                    name="Desert Wellness" 
                    location="Jaisalmer" 
                    price="$1200" 
                    emoji="🏜️" 
                />
                </div>
            </section>
            </div>

            {/* Third Column - Past Bookings */}
            <div className="lg:col-span-1 space-y-6">
            <section className="bg-white p-5 rounded-xl shadow-sm sticky top-6">
                <h3 className="text-gray-700 font-medium mb-4">Past Bookings</h3>
                <div className="space-y-4">
                <BookingItem 
                    name="Ocean Bliss Center" 
                    date="Mar 10, 2023" 
                    status="Completed" 
                />
                <BookingItem 
                    name="Mountain Yoga" 
                    date="Jan 5, 2023" 
                    status="Completed" 
                />
                <BookingItem 
                    name="Desert Retreat" 
                    date="Nov 20, 2022" 
                    status="Completed" 
                />
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                <h3 className="text-gray-700 font-medium mb-4">Quick Actions</h3>
                <button className="w-full mb-2 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                    Book New Retreat
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50">
                    Contact Support
                </button>
                </div>
            </section>
            </div>
        </div>
        </div>
    );
    };

    // Reusable Components
    const NavItem = ({ icon, label, active }) => (
    <li className={`flex items-center p-2 rounded-lg ${active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
    </li>
    );

    const DetailItem = ({ icon, text }) => (
    <p className="flex items-center text-gray-600 text-sm mb-1">
        <span className="mr-2">{icon}</span>
        {text}
    </p>
    );

    const RetreatCard = ({ emoji, name, location, price }) => (
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
        <div className="text-2xl mb-2">{emoji}</div>
        <h4 className="font-medium text-gray-800">{name}</h4>
        <p className="text-gray-500 text-sm">{location}</p>
        <p className="text-gray-700 font-medium mt-2">{price}</p>
    </div>
    );

    const BookingItem = ({ name, date, status }) => (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-gray-500 text-sm">{date}</p>
        <div className="flex justify-between items-center mt-1">
        <span className={`text-xs px-2 py-1 rounded-full ${status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
            {status}
        </span>
        <button className="text-blue-500 text-xs hover:text-blue-700">
            Details
        </button>
        </div>
    </div>
);

export default Dashboard;