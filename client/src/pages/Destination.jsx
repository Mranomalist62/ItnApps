    import React, { useEffect } from "react";
    import { Link } from "react-router-dom";
    
    const destinations = [
    {
        id: 1,
        name: "Bali",
        image: "/src/assets/ubud.jpg",
        description: "Bali offers a perfect blend of natural beauty and cultural richness. From serene beaches and lush rice terraces to traditional temples and wellness retreats, the island provides a peaceful escape with endless opportunities for exploration and relaxation.",
        highlights: [],
        retreatCount: 12,
    },
    {
        id: 2,
        name: "Yogyakarta",
        image: "/src/assets/yk.jpg",
        description: "Yogyakarta, often called the heart of Javanese culture, is known for its rich heritage, ancient temples, and vibrant arts scene. From the majestic Borobudur and Prambanan temples to traditional batik markets and cozy street food stalls, Jogja offers a soulful and authentic Indonesian experience.",
        highlights: [],
        retreatCount: 8,
    },
    {
        id: 3,
        name: "Jakarta",
        image: "/src/assets/jk.jpg",
        description: "Jakarta, Indonesia’s bustling capital, is a dynamic blend of modern skyscrapers, colonial architecture, and rich cultural diversity. Known for its vibrant nightlife, extensive shopping malls, and historical landmarks like Kota Tua, the city offers fast-paced urban energy with a touch of tradition.",
        highlights: [],
        retreatCount: 8,
    },
    {
        id: 4,
        name: "Surabaya",
        image: "/src/assets/sr.jpg",
        description: "Surabaya, the “City of Heroes,” blends modern commerce with deep-rooted history. As a major port and business hub, it offers vibrant local cuisine, colonial-era buildings, and cultural gems like the House of Sampoerna and traditional markets, all wrapped in East Javanese charm..",
        highlights: [],
        retreatCount: 8,
    },
    {
        id: 5,
        name: "Bandung",
        image: "/src/assets/bd.jpg",
        description: "Nestled among volcanic mountains, Bandung is famous for its cool climate, scenic tea plantations, and creative energy. Known as a fashion and culinary hotspot, the city is a favorite weekend escape offering art deco architecture, cozy cafes, and a vibrant youth culture.",
        highlights: [],
        retreatCount: 8,
    },
    ];

    const DestinationsPage = () => {
    useEffect(()=>{
        document.title = "Destination";
    });
    return (
        <div className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Explore Our Destinations</h1>
            <p className="text-blue-800 text-lg">
                Discover the most beautiful and serene locations for your wellness journey in Indonesia.
            </p>
            </div>

            <div className="space-y-16">
            {destinations.map((destination, index) => (
                <div
                key={destination.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={destination.image || "/placeholder.jpg"}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
                    </div>
                </div>

                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">{destination.name}</h2>
                    <div className="flex items-center text-blue-600 mb-6">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="mr-2"
                    >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="text-lg">Indonesia</span>
                    </div>

                    <p className="text-blue-700 mb-6">{destination.description}</p>

                    <div className="mb-8">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3"></h3>
                    <ul className="space-y-2">
                        {destination.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full mr-3 text-sm font-medium">
                            {idx + 1}
                            </span>
                            <span className="text-blue-900">{highlight}</span>
                        </li>
                        ))}
                    </ul>
                    </div>

                    <div className="flex items-center justify-between">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Retreats Available
                    </div>
                    <a
                    href={`/retreats?location=${encodeURIComponent(destination.name)}`}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-teal-600 transition-all duration-300 inline-flex items-center shadow-md"
                    >
                    Explore Retreats
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2"
                        >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </a>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
    };

    export default DestinationsPage;