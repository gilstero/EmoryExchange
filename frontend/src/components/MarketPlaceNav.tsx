import React, { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

export default function MarketPlaceNav() {

  const navigate = useNavigate()

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()
    try {
        await api.post("/api/auth/logout/", REFRESH_TOKEN)

        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)

        navigate("/")
    } catch (error) {
        console.error('Logout failed:', error)
        alert('Logout failed. Please try again.')
    }
  }

  return (
    <nav className="p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#efefee] shadow-md">
        <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9c]">
            <Link className="text-4xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/marketplace" aria-label="Eagle Exchange">
                <h1>Eagle Exchange</h1>
            </Link>

            <div className="flex items-center sm:justify-evenly align-middle gap-4 font-semibold">
                <Link to="/marketplace" className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg" aria-label="Marketplace">
                    Marketplace
                </Link>
                <Link to="/profile" className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg" aria-label="Profile">
                    Profile
                </Link>
                <button className="text-[#0c2b9c] px-4 py-2 rounded-lg cursor-pointer text-lg" aria-label="Logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    </nav>
  )
}
