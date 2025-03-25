import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faGraduationCap, faUser, faMagnifyingGlass,faBriefcase, faStore, faGear} from "@fortawesome/free-solid-svg-icons"

export default function MarketPlaceNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()

    try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        
        if (!refreshToken) {
            throw new Error("No refresh token")
        }

        await api.post("/api/auth/logout/", { refresh_token: refreshToken })

        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)

        navigate("/")
    } catch (error) {
        console.error('Logout failed:', error)
        alert('Logout failed. Please try again.')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="p-4 md:p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#efefee] shadow-md">
        <header className="prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9c] relative">
            <Link className="text-2xl md:text-3xl font-bold grid place-content-center mb-0 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/marketplace" aria-label="Eagle Exchange">
                <h1 className="m-0 leading-tight">Eagle Exchange</h1>
            </Link>

            {/* Hamburger menu button */}
            <button 
              className="md:hidden flex flex-col justify-center items-center"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block w-6 h-0.5 bg-[#0c2b9c] transition-all duration-300 mb-1.5 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-[#0c2b9c] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-[#0c2b9c] transition-all duration-300 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center sm:justify-evenly align-middle gap-4 font-semibold">
                <Link to="/marketplace" className="bg-[#0c2b9c] hover:bg-[#0a2283] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg transition-colors" aria-label="Marketplace">
                    <FontAwesomeIcon icon={faStore} /> Marketplace
                </Link>
                <Link to="/profile" className="bg-[#0c2b9c] hover:bg-[#0a2283] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg transition-colors" aria-label="Profile">
                    <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
                <Link to="/edit-profile" className="bg-[#0c2b9c] hover:bg-[#0a2283] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg transition-colors" aria-label="Settings">
                  <FontAwesomeIcon icon={faGear} /> Settings
                </Link>
                <button className="text-[#0c2b9c] hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer text-lg transition-colors" aria-label="Logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Mobile navigation */}
            <div className={`absolute top-full right-0 left-0 bg-[#efefee] shadow-md transition-all duration-300 mt-2 md:hidden ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="flex flex-col p-4 gap-3">
                    <Link 
                      to="/marketplace" 
                      className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg text-center" 
                      aria-label="Marketplace"
                      onClick={() => setIsMenuOpen(false)}
                    >
                        Marketplace
                    </Link>
                    <Link 
                      to="/profile" 
                      className="bg-[#0c2b9c] text-slate-50 px-4 py-2 rounded-lg cursor-pointer text-lg text-center" 
                      aria-label="Profile"
                      onClick={() => setIsMenuOpen(false)}
                    >
                        Profile
                    </Link>
                    <button 
                      className="text-[#0c2b9c] border border-[#0c2b9c] px-4 py-2 rounded-lg cursor-pointer text-lg text-center" 
                      aria-label="Logout" 
                      onClick={(e) => {
                        setIsMenuOpen(false)
                        handleLogout(e)
                      }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    </nav>
  )
}