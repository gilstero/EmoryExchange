import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  title?: string; // Optional title prop to change the title of the Navbar
}

export default function Navbar({ title = "Eagle Exchange" }: NavbarProps) {
  const location = useLocation();
  return (
    <nav className="w-screen p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#edecdf]">
      <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9c]">
        <Link
          className="text-4xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer"
          to="/"
        >
          <h1>{title}</h1>
        </Link>
        {location.pathname === "/" ? (
          <div className="flex items-center sm:justify-evenly align-middle gap-4 font-semibold">
            <Link to="/login" className="cursor-pointer text-lg">
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg"
            >
              Sign up
            </Link>
          </div>
        ) : location.pathname === "/account" ? (
          <div className="flex items-center sm:justify-evenly align-middle gap-4 font-semibold">
            <Link
              to="/marketplace"
              className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg"
            >
              Marketplace
            </Link>
          </div>
        ) : (
          <div className="flex items-center sm:justify-evenly align-middle gap-4 font-semibold">
            <Link
              to="/account"
              className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg"
            >
              Account
            </Link>
          </div>
        )}
      </header>
    </nav>
  );
}
