import React from "react";
import { useState } from "react";
import { handleRegister } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { FaAlignLeft, FaAlignRight, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    const success = await handleRegister(e, form, setMessage);
    if (success) {
      navigate('/login');
    }
  };

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
            <p>{message}</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="col-span-1 space-y-6">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <div className="flex items-center border rounded-md px-3 mt-1">
                  <FaAlignLeft className="text-gray-400" />
                  <input onChange={handleChange} requiredtype="text" placeholder="Your First Name" className="w-full px-2 py-2 focus:outline-none" name="first_name"/>
                </div>
              </div>
              <div className="col-span-1 space-y-6">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <div className="flex items-center border rounded-md px-3 mt-1">
                  <FaAlignRight className="text-gray-400" />
                  <input onChange={handleChange} requiredtype="text" placeholder="Your Last Name" className="w-full px-2 py-2 focus:outline-none" name="last_name"/>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="flex items-center border rounded-md px-3 mt-1">
                <FaEnvelope className="text-gray-400" />
                <input onChange={handleChange} type="email" requiredtype="email" placeholder="your@email.com" className="w-full px-2 py-2 focus:outline-none" name="email"/>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center border rounded-md px-3 mt-1">
                <FaLock className="text-gray-400" />
                <input onChange={handleChange} type="password" requiredtype="password" placeholder="••••••••" className="w-full px-2 py-2 focus:outline-none" name="password"/>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="flex items-center border rounded-md px-3 mt-1">
                <FaLock className="text-gray-400" />
                <input onChange={handleChange} type="password" requiredtype="password" placeholder="••••••••" className="w-full px-2 py-2 focus:outline-none" name="confirm_password"/>
              </div>
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
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
