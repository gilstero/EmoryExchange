import React from 'react'
import { Link } from "react-router-dom"

export default function Main() {
  return (
    <div className="p-8 flex justify-center items-center">
      <div className="w-[75%] h-[400px] flex flex-col p-12 justify-center items-center bg-[#0c2b9c] rounded-lg gap-6 md:gap-12">
        <h3 className="text-2xl/relaxed text-white text-center sm:text-4xl">Tutoring, career advice, moving help, and more. 
        </h3>
        <h3 className="text-2xl/relaxed text-white text-center sm:text-4xl">Find Emory freelancers that want to help you!
        </h3>
        {/* <Link to="/signup" className="bg-white text-[#0c2b9c] px-6 py-4 rounded-lg cursor-pointer font-bold text-base sm:text-xl">
          Get Started
        </Link> */}
        <Link to="/marketplace" className="bg-white text-[#0c2b9c] px-6 py-4 rounded-lg cursor-pointer font-bold text-base sm:text-xl" aria-label="Marketplace">
          Browse Marketplace
        </Link>
      </div>
    </div>
  )
}
