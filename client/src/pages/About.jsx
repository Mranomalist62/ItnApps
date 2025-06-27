import { MapPin, Mail, Phone, ArrowRight, Instagram, Twitter, Linkedin } from "lucide-react"


    export default function AboutPage() {
    const teamMembers = [
            {
            id: 1,
            name: "Jason Statham",
            role: "Developer & Designer",
            image: "/src/assets/developer.jpg",
            bio: "With over 15 years of experience in wellness retreats and a background in holistic health, Sarah founded Serenity Retreats to create transformative experiences that combine traditional practices with modern wellness approaches.",
            social: { instagram: "#", twitter: "#", linkedin: "#" },
            },

            {
            id: 2,
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "/src/assets/ceo.jpg",
            bio: "With over 15 years of experience in wellness retreats and a background in holistic health, Sarah founded Serenity Retreats to create transformative experiences that combine traditional practices with modern wellness approaches.",
            social: { instagram: "#", twitter: "#", linkedin: "#" },
            },

            {
                id: 3,
                name: "Ethan Hunt",
                role: "Exceutive Marketing",
                image: "/src/assets/marketing.jpg",
                bio: "With over 15 years of experience in wellness retreats and a background in holistic health, Sarah founded Serenity Retreats to create transformative experiences that combine traditional practices with modern wellness approaches.",
                social: { instagram: "#", twitter: "#", linkedin: "#" },
                },
    ]

    return (
        <div className="font-sans">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-r from-blue-800 to-teal-600 overflow-hidden">
            <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full min-h-[400px]">
                <img
                src="/placeholder.svg?height=1080&width=1920&text=Team"
                alt="Our team"
                className="object-cover w-full h-full opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-700 opacity-80" />
            </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Meet Our Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                The passionate individuals behind Serenity Retreats who are dedicated to creating transformative wellness experiences for our guests.
            </p>
            </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6">
                Our Story
                </span>
                <h2 className="text-4xl font-bold text-blue-900 mb-6 leading-tight">
                A Journey of Wellness and Transformation
                </h2>
                <p className="text-lg text-blue-700 mb-6">
                Serenity Retreats was born from a simple yet profound vision: to create spaces where people could disconnect from the chaos of everyday life and reconnect with themselves in beautiful, natural settings.
                </p>
                <p className="text-lg text-blue-700 mb-8">
                Founded in 2015 by Sarah Johnson after her own transformative retreat experience in Bali, our company has grown from a single retreat location to multiple destinations across Indonesia.
                </p>
                <a href="/retreats" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-teal-600 transition-all">
                Explore Our Retreats <ArrowRight className="ml-2" size={18} />
                </a>
            </div>

            <div className="relative">
                <div className="relative z-10 rounded-xl overflow-hidden shadow-lg">
                <img
                    src="/src/assets/team.jpg"
                    alt="Our story"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                />
                </div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 rounded-xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 rounded-xl -z-10" />
            </div>
            </div>
        </section>

        {/* Team Members */}
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
                Our Experts
                </span>
                <h2 className="text-4xl font-bold text-blue-900 mb-4">The People Behind Serenity Retreats</h2>
                <p className="text-lg text-blue-700 max-w-2xl mx-auto">
                Our diverse team brings together expertise in yoga, nutrition, adventure, and wellness to create holistic retreat experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="relative h-80 w-full overflow-hidden">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 w-full">
                        <div className="flex justify-center space-x-4">
                            <a 
                            href={member.social.instagram} 
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors"
                            aria-label="Instagram"
                            >
                            <Instagram size={18} />
                            </a>
                            <a 
                            href={member.social.twitter} 
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors"
                            aria-label="Twitter"
                            >
                            <Twitter size={18} />
                            </a>
                            <a 
                            href={member.social.linkedin} 
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors"
                            aria-label="LinkedIn"
                            >
                            <Linkedin size={18} />
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-blue-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-blue-700">{member.bio}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        <section className="py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
                    Our Values
                </span>
                <h2 className="text-4xl font-bold text-blue-900 mb-4">What Guides Us</h2>
                <p className="text-lg text-blue-700 max-w-2xl mx-auto">
                    Our core values shape every retreat we create and every interaction we have with our guests.
                </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Authenticity Card */}
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                    >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m7 10 3 3 7-7"></path>
                    </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-blue-900">Authenticity</h3>
                    <p className="text-blue-700">
                    We believe in creating genuine experiences that honor local traditions and foster real connections.
                    </p>
                </div>

                {/* Sustainability Card */}
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                    >
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                    </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-blue-900">Sustainability</h3>
                    <p className="text-blue-700">
                    We're committed to environmental responsibility and supporting the communities we operate in.
                    </p>
                </div>

                {/* Inclusivity Card */}
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                    >
                        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                    </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-blue-900">Inclusivity</h3>
                    <p className="text-blue-700">
                    We create welcoming spaces for all individuals, regardless of background or experience level.
                    </p>
                </div>

                {/* Transformation Card */}
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-blue-900">Transformation</h3>
                    <p className="text-blue-700">
                    We believe in the power of retreat experiences to create lasting positive change in people's lives.
                    </p>
                </div>
                </div>
            </div>
        </section>


        {/* Contact Section */}
        <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6">
                Get In Touch
                </span>
                <h2 className="text-4xl font-bold text-blue-900 mb-6">Contact Our Team</h2>
                <p className="text-lg text-blue-700 mb-8">
                Have questions about our retreats or want to learn more about what we offer? Our team is here to help
                you on your wellness journey.
                </p>

                <div className="space-y-6">
                <div className="flex items-start">
                    <MapPin size={24} className="mr-4 text-blue-600 flex-shrink-0" />
                    <div>
                    <h3 className="font-medium text-lg text-blue-900">Our Headquarters</h3>
                    <p className="text-blue-700">Jl. Wellness No. 123, Ubud, Bali, Indonesia</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <Mail size={24} className="mr-4 text-blue-600 flex-shrink-0" />
                    <div>
                    <h3 className="font-medium text-lg text-blue-900">Email Us</h3>
                    <p className="text-blue-700">info@serenityretreats.com</p>
                    <p className="text-blue-700">bookings@serenityretreats.com</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <Phone size={24} className="mr-4 text-blue-600 flex-shrink-0" />
                    <div>
                    <h3 className="font-medium text-lg text-blue-900">Call Us</h3>
                    <p className="text-blue-700">+62 123 4567 890</p>
                    <p className="text-blue-700">+62 098 7654 321</p>
                    </div>
                </div>
                </div>

                <div className="mt-8">
                <a 
                    href="/contact" 
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-600 transition-colors"
                >
                    Send Us a Message
                    <ArrowRight size={18} className="ml-2" />
                </a>
                </div>
            </div>

            <div className="relative">
                <div className="relative z-10 rounded-xl overflow-hidden shadow-lg">
                <img
                    src="/src/assets/our_team.jpg"
                    alt="Contact us"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                />
                </div>
                <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-blue-100 rounded-xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-xl -z-10"></div>
            </div>
            </div>
        </div>
        </section>
        </div>
    )
    }