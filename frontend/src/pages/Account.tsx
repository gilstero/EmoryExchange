import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Listing from "../components/Listing";
import AccountProfile from "../components/AccountProfile";

export default function Account() {
  const [showListings, setShowListings] = useState(true); // Toggle state
  const name: string = "Example Exampler";
  const email: string = "example@gmail.com";
  const phoneNum: string = "123-456-7890";
  return (
    <div className="flex flex-col items-center min-h-screen overflow-hidden">
      <Navbar />
      {/*Max padding without scroll bar on page is 7 */}
      <div className="flex felx-row w-full py-7 px-4 gap-x-10">
        <div className="w-1/4">
          <AccountProfile name={name} email={email} phoneNum={phoneNum} />
        </div>
        {/* Border for listings and requests */}
        <div className="flex flex-col w-3/4 mx-auto rounded-lg border border-black h-155 overflow-y-auto">
          <nav className="flex justify-between sticky top-0 z-50 border-b bg-[#edecdf] left-0 right-0 shadow-xl">
            {/* Dynamic title */}
            <h1 className="text-3xl font-bold center m-2">
              {name}'s {showListings ? "Listings" : "Requests"}:
            </h1>
            {/* Toggle Button */}
            <div className="relative flex bg-gray-300 rounded-full m-2">
              {/* Toggle Background (Highlight) */}
              <div
                className={`pointer-events-none absolute top-0 left-0 w-1/2 h-full bg-[#0c2b9c]/50 rounded-full transition-all duration-300 ${
                  showListings ? "translate-x-0" : "translate-x-full"
                }`}
              ></div>
              <button
                className="shadow-xl rounded-full bg-[#f0f0f0] px-6 py-2 transition-shadow duration-300 hover:bg-gray-300"
                onClick={() => setShowListings(!showListings)}
              >
                {"Listings - Requests"}
              </button>
            </div>
          </nav>

          <div className="grid grid-cols-3 gap-6 px-6 py-6 flex-1 overflow-y-auto">
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
          </div>
        </div>
      </div>
    </div>
  );
}
