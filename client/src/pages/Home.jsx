import React from 'react';
import backgroundImage from '../assets/bghome.jpg';
import yoga from '../assets/yoga.jpg';
import adventure from '../assets/adventure.jpg';
import spa from '../assets/spa.jpg';
import { Link } from 'react-router-dom';



    const HomePage = () => {
    return (
        <div className="pt-16 bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section
            className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="absolute inset-0 bg-white/40 z-0"></div>

            <div className="relative z-10 max-w-4xl text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
                Discover Inner Peace
                </h1>
                <h2 className="text-3xl md:text-5xl font-semibold text-blue-800">
                Find Your Perfect
                </h2>
                <h3 className="text-3xl md:text-5xl font-semibold text-blue-700 mb-8">
                Wellness Journey
                </h3>
                <p className="text-lg md:text-xl text-black max-w-2xl mx-auto">
                Transformative retreats for mind, body and soul in the most beautiful
                destinations of Indonesia
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
                    Find My Perfect Retreat
                </button>
                <button className="border-2 border-blue-600 text-white hover:bg-blue-50 hover:text-blue-600 font-semibold py-3 px-8 rounded-full transition duration-300">
                    Browse All Retreats
                </button>
                </div>
            </div>
        </section>


    {/* Explore Retreat Categories Section */}
    <section className="py-20 px-8 bg-white">
    <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Explore Retreat Categories
        </h2>
        <p className="text-gray-600 mb-12">
        Discover the perfect wellness experience tailored to your needs and preferences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div
            className="rounded-2xl text-left text-white relative min-h-[300px] overflow-hidden"
            style={{
            backgroundImage: "url('src/assets/yoga.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 via-gray-800/50 to-transparent rounded-2xl group-hover:scale-[1.02] transition-transform duration-300 z-0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3 className="text-2xl font-semibold mb-2">Yoga & Meditation</h3>
            <p className="mb-4 text-gray-100">Find inner peace and balance through mindful practices</p>
            <Link to={{ pathname: "/retreats", search: "?Yoga%20%26%20Meditation" }} className="text-white font-semibold hover:underline inline-flex items-center">
                Explore retreats <span className="ml-2">→</span>
            </Link>
        </div>
</div>


        {/* Card 2 */} 
        <div
            className="rounded-2xl text-left text-white relative min-h-[300px] overflow-hidden"
            style={{
            backgroundImage: "url('src/assets/spa.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-gray/60 via-gray-800/50 to-transparent rounded-2xl group-hover:scale-[1.02] transition-transform duration-300 z-0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3 className="text-2xl font-semibold mb-2">Spa & Detox</h3>
            <p className="mb-10 text-gray-100">Cleanse your body and rejuvenate your spirit</p>
            <Link to={{ pathname: "/retreats", search: "?category=Spa%20%26%20Detox" }} className="text-white font-semibold hover:underline inline-flex items-center">
                Explore retreats <span className="ml-2">→</span>
            </Link>
            </div>
        </div>

        {/* Card 3 */}
        <div
            className="rounded-2xl text-left text-white relative min-h-[300px] overflow-hidden"
            style={{
            backgroundImage: "url('src/assets/adventure.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-gray/60 via-gray-800/50 to-transparent rounded-2xl group-hover:scale-[1.02] transition-transform duration-300 z-0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3 className="text-2xl font-semibold mb-2">Adventure & Wellness</h3>
            <p className="mb-4 text-gray-100">Combine thrilling activities with mindful relaxation</p>
            <Link to={{ pathname: "/retreats", search: "?category=Adventure%20%26%Wellness" }} className="text-white font-semibold hover:underline inline-flex items-center">
                Explore retreats <span className="ml-2">→</span>
            </Link>
            </div>
        </div>
        </div>
    </div>
</section>

    {/* Testimonials Section */}
<section className="py-20 px-8 bg-blue-50 ">
    <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
        What Our Guests Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* <div className="flex gap-5 overflow-x-300 "> */}
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm ">
            <p className="text-gray-700 italic mb-4">"This retreat changed my life. I came in stressed and left with a new perspective."</p>
            <div className="flex justify-between items-center">
            <p className="font-semibold text-blue-800">Sarah J.</p>
            <p className="text-yellow-500">★★★★★</p>
            </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm ">
            <p className="text-gray-700 italic mb-4">"The perfect balance of relaxation and personal growth activities."</p>
            <div className="flex justify-between items-center">
            <p className="font-semibold text-blue-800">Michael T.</p>
            <p className="text-yellow-500">★★★★★</p>
            </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-sm ">
            <p className="text-gray-700 italic mb-4">"The location was paradise and the facilitators were incredibly knowledgeable."</p>
            <div className="flex justify-between items-center">
            <p className="font-semibold text-blue-800">Priya K.</p>
            <p className="text-yellow-500">★★★★☆</p>
            </div>
        </div>
        </div>
    </div>
</section>

        {/* CTA Section */}
        <section className="py-20 px-8  bg-gradient-to-r from-blue-800 to-teal-600 overflow-hidden text-white">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready for Your Transformation?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join our next retreat and begin your journey to wellness today.
            </p>
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition duration-300">
                Schedule Now
            </button>
            </div>
        </section>
        </div>
    );
    };

    export default HomePage;