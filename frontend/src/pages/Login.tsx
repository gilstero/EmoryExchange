import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <nav className="p-8 top-0 z-[100] border-b-blue-700 bg-[#edecdf]">
        <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9c]">
            <Link className="text-4xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/">
                <h1>Eagle Exchange</h1>
            </Link>
          </header>
      </nav>
      <div className="flex items-center justify-center h-full mt-20">
        <Form route="/api/auth/login/" method="login" />
      </div>
    </>
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="bg-slate-100 p-6 rounded-xl shadow-md w-full max-w-md">
    //     <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
    //     <form>
    //       <div className="mb-4">
    //         <label className="block text-gray-700">Email</label>
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
    //       <button
    //         type="submit"
    //         className="w-full bg-[#0c2b9c] text-white py-2 rounded-md hover:bg-[#0c2b9ce1] transition duration-300 cursor-pointer"
    //       >
    //         Log In
    //       </button>
    //     </form>
    //     <div className="mt-4 text-center">
    //       <p className="text-black-500">Don't have an account? <Link to="/signup" className="text-[#0c2b9c]">Sign Up</Link></p>
    //     </div>
    //   </div>
    // </div>
  )
}