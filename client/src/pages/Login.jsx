import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulasi login berhasil jika email dan password tidak kosong
        if (email && password) {
            setIsLoggedIn(true);
            navigate('/profile'); // Redirect ke halaman dashboard/profile setelah login
        } else {
            alert('Please enter email and password');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image or Welcome Text */}
            <div className="hidden md:flex w-1/2 bg-gray-100 justify-center items-center flex-col p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
                    <p className="mt-4 text-gray-600">
                        Continue your wellness journey with{' '}
                        <span className="text-green-500 font-semibold">Serenity Retreats</span>
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-6">
                <div className="w-full max-w-md">
                    <Link 
                        to="/" 
                        className="inline-block mb-4 text-green-600 hover:underline font-medium"
                    >
                        &larr; Back to Home
                    </Link>

                    <h2 className="text-2xl font-bold mb-2">Sign In</h2>
                    <p className="text-gray-600 mb-6">Access your account and bookings</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="flex items-center border rounded-md px-3 mt-1">
                                <FaEnvelope className="text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-2 py-2 focus:outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">Forgot password?</Link>
                            </div>
                            <div className="flex items-center border rounded-md px-3 mt-1">
                                <FaLock className="text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-2 py-2 focus:outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-sm text-gray-500">Or continue with</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="flex justify-between space-x-4">
                        <button className="flex items-center justify-center w-full border px-4 py-2 rounded-md">
                            <FcGoogle className="mr-2 text-lg" /> Google
                        </button>
                        <button className="flex items-center justify-center w-full border px-4 py-2 rounded-md">
                            <FaGithub className="mr-2 text-lg" /> GitHub
                        </button>
                    </div>

                    <p className="mt-6 text-sm text-center">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-green-600 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
