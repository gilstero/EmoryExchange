import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-100 p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0c2b9c] text-white py-2 rounded-md hover:bg-[#0c2b9ce1] transition duration-300 cursor-pointer"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-black-500">Don't have an account? <Link to="/signup" className="text-[#0c2b9c]">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};