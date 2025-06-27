import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, ChevronLeft } from 'react-feather';

// Mock retreat data
const mockRetreats = [
    {
        id: 1,
        title: "Bali Relaxation Retreat",
        description: "A peaceful getaway in the heart of Bali's lush jungles",
        goal: "Relaxation",
        location: "Bali",
        priceCategory: "Medium",
        price: "$1,200",
        duration: "7 days",
        featured: true,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Java Detox Program",
        description: "Cleanse your body and mind in Yogyakarta",
        goal: "Detox",
        location: "Yogyakarta",
        priceCategory: "High",
        price: "$1,800",
        duration: "10 days",
        featured: true,
        image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Adventure Wellness Camp",
        description: "Combine adventure activities with wellness practices",
        goal: "Adventure",
        location: "Bali",
        priceCategory: "Low",
        price: "$800",
        duration: "5 days",
        featured: true,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Luxury Spa Getaway",
        description: "Premium spa treatments in a luxury resort",
        goal: "Relaxation",
        location: "Bali",
        priceCategory: "High",
        price: "$2,000",
        duration: "5 days",
        featured: false,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "Budget Meditation Retreat",
        description: "Affordable meditation program for beginners",
        goal: "Relaxation",
        location: "Yogyakarta",
        priceCategory: "Low",
        price: "$600",
        duration: "4 days",
        featured: false,
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
    ];

    // Mock API service
    const RetreatService = {
    getRetreats: () => {
        return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockRetreats);
        }, 500); // Simulate network delay
        });
    }
    };

    // Retreat Card Component
    const RetreatCard = ({ retreat }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        <img 
            src={retreat.image} 
            alt={retreat.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{retreat.title}</h3>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                {retreat.price}
            </span>
            </div>
            <p className="text-gray-600 mb-4">{retreat.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {retreat.goal}
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {retreat.location}
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {retreat.duration}
            </span>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            View Details
            </button>
        </div>
        </div>
    );
    };

    // Main Component
    const FindMyRetreat = () => {
    const [step, setStep] = useState(1);
    const [preferences, setPreferences] = useState({
        goal: "",
        location: "",
        budget: "",
    });
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allRetreats, setAllRetreats] = useState([]);

    // Load retreat data on component mount
    useEffect(() => {
        const loadRetreats = async () => {
        try {
            const data = await RetreatService.getRetreats();
            setAllRetreats(data);
        } catch (error) {
            console.error("Error loading retreats:", error);
        }
        };
        loadRetreats();
    }, []);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const getRecommendations = async () => {
        setIsLoading(true);
        try {
        // Filter retreats based on preferences
        let results = allRetreats.filter(retreat => {
            return (
            (!preferences.goal || retreat.goal === preferences.goal) &&
            (!preferences.location || retreat.location === preferences.location) &&
            (!preferences.budget || retreat.priceCategory === preferences.budget)
            );
        });

        // If no matches, show featured retreats
        if (results.length === 0) {
            results = allRetreats.filter(retreat => retreat.featured);
        }

        // Limit to 3 recommendations
        setRecommendations(results.slice(0, 3));
        setShowRecommendations(true);
        } catch (error) {
        console.error("Error getting recommendations:", error);
        setRecommendations(allRetreats.slice(0, 3));
        setShowRecommendations(true);
        } finally {
        setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
        case 1:
            return (
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">What is your wellness goal?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['Relaxation', 'Detox', 'Adventure'].map((goal) => (
                    <button
                    key={goal}
                    className={`p-8 rounded-xl border-2 transition-all hover:shadow-lg ${
                        preferences.goal === goal
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                    onClick={() => {
                        setPreferences(prev => ({ ...prev, goal }));
                        nextStep();
                    }}
                    >
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {goal === 'Relaxation' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        )}
                        {goal === 'Detox' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                            <line x1="6" y1="1" x2="6" y2="4" />
                            <line x1="10" y1="1" x2="10" y2="4" />
                            <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                        )}
                        {goal === 'Adventure' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m2 6 3 9h14l3-9" />
                            <path d="M6 16v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" />
                            <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1" />
                        </svg>
                        )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{goal}</h3>
                    <p className="text-gray-600">
                        {goal === 'Relaxation' && 'Unwind, de-stress, and find inner peace through meditation and gentle practices'}
                        {goal === 'Detox' && 'Cleanse your body and reset your system with specialized nutrition and treatments'}
                        {goal === 'Adventure' && 'Explore and experience new activities while maintaining wellness practices'}
                    </p>
                    {preferences.goal === goal && (
                        <div className="mt-4 flex items-center justify-center">
                        <span className="bg-indigo-600 text-white p-1 rounded-full">
                            <Check size={16} />
                        </span>
                        <span className="ml-2 text-indigo-600 font-medium">Selected</span>
                        </div>
                    )}
                    </button>
                ))}
                </div>
            </div>
            );

        case 2:
            return (
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">Where would you like to go?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {['Bali', 'Yogyakarta'].map((location) => (
                    <button
                    key={location}
                    className={`p-8 rounded-xl border-2 transition-all hover:shadow-lg ${
                        preferences.location === location
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                    onClick={() => {
                        setPreferences(prev => ({ ...prev, location }));
                        nextStep();
                    }}
                    >
                    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-6 bg-gray-100">
                        <img
                        src={location === 'Bali' 
                            ? "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                            : "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}
                        alt={location}
                        className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{location}</h3>
                    <p className="text-gray-600">
                        {location === 'Bali' 
                        ? "Island of the Gods with beaches, spiritual experiences, and lush landscapes"
                        : "Cultural heart of Java with ancient temples, traditions, and natural beauty"}
                    </p>
                    {preferences.location === location && (
                        <div className="mt-4 flex items-center justify-center">
                        <span className="bg-indigo-600 text-white p-1 rounded-full">
                            <Check size={16} />
                        </span>
                        <span className="ml-2 text-indigo-600 font-medium">Selected</span>
                        </div>
                    )}
                    </button>
                ))}
                </div>
                <button
                onClick={prevStep}
                className="mt-8 text-indigo-600 hover:text-indigo-700 font-medium flex items-center mx-auto"
                >
                <ChevronLeft size={20} className="mr-1" />
                Back to previous step
                </button>
            </div>
            );

        case 3:
            return (
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">What is your budget?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['Low', 'Medium', 'High'].map((budget) => (
                    <button
                    key={budget}
                    className={`p-8 rounded-xl border-2 transition-all hover:shadow-lg ${
                        preferences.budget === budget
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                    onClick={() => {
                        setPreferences(prev => ({ ...prev, budget }));
                        getRecommendations();
                    }}
                    >
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-indigo-600 font-bold text-xl">
                        {budget === 'Low' ? '$' : budget === 'Medium' ? '$$' : '$$$'}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                        {budget === 'Low' ? 'Budget-Friendly' : budget === 'Medium' ? 'Mid-Range' : 'Luxury'}
                    </h3>
                    <p className="text-gray-600">
                        {budget === 'Low' ? 'Under $1,000' : budget === 'Medium' ? '$1,000 - $1,500' : 'Above $1,500'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        {budget === 'Low' ? 'Perfect for travelers on a budget' : 
                        budget === 'Medium' ? 'Balance of comfort and value' : 
                        'Premium experiences and amenities'}
                    </p>
                    {preferences.budget === budget && (
                        <div className="mt-4 flex items-center justify-center">
                        <span className="bg-indigo-600 text-white p-1 rounded-full">
                            <Check size={16} />
                        </span>
                        <span className="ml-2 text-indigo-600 font-medium">Selected</span>
                        </div>
                    )}
                    </button>
                ))}
                </div>
                <button
                onClick={prevStep}
                className="mt-8 text-indigo-600 hover:text-indigo-700 font-medium flex items-center mx-auto"
                >
                <ChevronLeft size={20} className="mr-1" />
                Back to previous step
                </button>
            </div>
            );

        default:
            return null;
        }
    };

    return (
        <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full mb-4">
                Personalized Recommendations
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Find Your Perfect Retreat</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Answer a few questions and we'll recommend the best wellness retreats for you.
            </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold mb-2">Finding your perfect retreats...</h3>
                <p className="text-gray-600">We're analyzing your preferences to find the best matches.</p>
                </div>
            ) : !showRecommendations ? (
                <>
                <div className="flex justify-center mb-12">
                    <div className="flex items-center">
                    {[1, 2, 3].map((stepNumber) => (
                        <React.Fragment key={stepNumber}>
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                            step >= stepNumber ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {stepNumber}
                        </div>
                        {stepNumber < 3 && (
                            <div className={`w-20 h-1 ${step > stepNumber ? "bg-indigo-600" : "bg-gray-200"}`}></div>
                        )}
                        </React.Fragment>
                    ))}
                    </div>
                </div>
                {renderStepContent()}
                </>
            ) : (
                <div className="animate-fadeIn">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Your Recommended Retreats</h2>
                    <button
                    onClick={() => {
                        setShowRecommendations(false);
                        setStep(1);
                        setPreferences({
                        goal: "",
                        location: "",
                        budget: "",
                        });
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
                    >
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
                        className="mr-1"
                    >
                        <path d="M2.5 2v6h6M21.5 22v-6h-6"></path>
                        <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"></path>
                    </svg>
                    Start Over
                    </button>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl mb-10">
                    <h3 className="font-bold mb-3">Your Preferences</h3>
                    <div className="flex flex-wrap gap-3">
                    <div className="bg-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                        Goal: {preferences.goal || "Any"}
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                        Location: {preferences.location || "Any"}
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                        Budget: {preferences.budget || "Any"}
                    </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.length > 0 ? (
                    recommendations.map((retreat) => (
                        <RetreatCard key={retreat.id} retreat={retreat} />
                    ))
                    ) : (
                    <div className="col-span-3 text-center py-12">
                        <h3 className="text-xl font-bold mb-2">No retreats match your criteria</h3>
                        <p className="text-gray-600 mb-6">Here are some featured retreats you might like:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {allRetreats
                            .filter((retreat) => retreat.featured)
                            .slice(0, 3)
                            .map((retreat) => (
                            <RetreatCard key={retreat.id} retreat={retreat} />
                            ))}
                        </div>
                    </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Don't see what you're looking for? Browse all our retreats or contact us for personalized
                    recommendations tailored to your specific needs.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center">
                        Browse All Retreats
                        <ArrowRight size={18} className="ml-2" />
                    </button>
                    <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors inline-flex items-center justify-center">
                        Contact Us
                    </button>
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>
        </div>
    );
};

export default FindMyRetreat;