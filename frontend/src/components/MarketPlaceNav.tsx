import React from 'react'
import { Link } from 'react-router-dom'

export default function MarketPlaceNav() {
  return (
    <nav className="p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#efefee] shadow-md">
        <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9c]">
            <Link className="text-4xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/marketplace" aria-label="Eagle Exchange">
                <h1>Eagle Exchange</h1>
            </Link>

            <div className="flex items-center sm:justify-evenly align-middle gap-4 font-semibold">
                <Link to="/profile" className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg" aria-label="Profile">
                    Profile
                </Link>
            </div>
        </header>
    </nav>
  )
}
