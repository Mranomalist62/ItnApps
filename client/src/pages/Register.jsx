import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Register = () => {
    return (
        <div className="min-h-screen flex">
        {/* Left Side - Image or Welcome Text */}
        <div className="hidden md:flex w-1/2 bg-gray-100 justify-center items-center flex-col p-8">
            {/* Bisa diganti jadi gambar */}
            <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Join Us</h2>
            <p className="mt-4 text-gray-600">
                Start your wellness journey with <span className="text-green-500 font-semibold">Serenity Retreats</span>
            </p>
            </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
            <div className="w-full max-w-md">
            {/* Button Back */}
            <Link to="/" className="inline-block mb-4 text-green-600 hover:underline font-medium">
                &larr; Back to Home
            </Link>

            <h2 className="text-2xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-600 mb-6">Sign up to start your journey</p>

            <form className="space-y-4">
                {/* Name */}
                <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="flex items-center border rounded-md px-3 mt-1">
                    <FaUser className="text-gray-400" />
                    <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-2 py-2 focus:outline-none"
                    />
                </div>
                </div>

                {/* Email */}
                <div>
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="flex items-center border rounded-md px-3 mt-1">
                    <FaEnvelope className="text-gray-400" />
                    <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-2 py-2 focus:outline-none"
                    />
                </div>
                </div>

                {/* Password */}
                <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="flex items-center border rounded-md px-3 mt-1">
                    <FaLock className="text-gray-400" />
                    <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-2 py-2 focus:outline-none"
                    />
                </div>
                </div>

                {/* Confirm Password */}
                <div>
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="flex items-center border rounded-md px-3 mt-1">
                    <FaLock className="text-gray-400" />
                    <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-2 py-2 focus:outline-none"
                    />
                </div>
                </div>

                {/* Sign Up Button */}
                <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                >
                Sign Up
                </button>
            </form>

            {/* Sign In Link */}
            <p className="mt-6 text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:underline">
                Sign In
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
};

export default Register;
