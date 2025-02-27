import React, { useState } from 'react';
import { Link } from "react-router-dom"
import Form from '../components/Form';

export default function Register() {
  // const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Form route="/api/user/register/" method="register" />
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="bg-slate-100 p-6 rounded-xl shadow-md w-full max-w-md">
    //     <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    //     <form>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Full Name</label>
    //         <input
    //           type="text"
    //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    //           value={fullname}
    //           onChange={(e) => setFullname(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Email Address</label>
    //         <input
    //           type="email"
    //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Password</label>
    //         <input
    //           type="password"
    //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Confirm Password</label>
    //         <input
    //           type="password"
    //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    //           value={confirmPassword}
    //           onChange={(e) => setConfirmPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-[#0c2b9c] text-white py-2 rounded-md hover:bg-[#0c2b9ce1] transition duration-300 cursor-pointer"
    //       >
    //         Sign Up
    //       </button>
    //     </form>
    //     <div className="mt-4 text-center">
    //       <p className="text-black-500">Already have an account? <Link to="/login" className="text-[#0c2b9c]">Log In</Link> </p>
    //     </div>
    //   </div>
    // </div>
  )
}