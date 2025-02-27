import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {

  return (
    <nav className="p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#edecdf]">
        <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9c]">
            <Link className="text-4xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/">
                <h1>Eagle Exchange</h1>
            </Link>

            <div className="flex items-center sm:justify-evenly align-middle gap-4 font-semibold">
                <Link to="/login" className="cursor-pointer text-lg">Log in</Link>
                <Link to="/register" className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg">
                    Register
                </Link>
            </div>
        </header>
    </nav>
  )
}
