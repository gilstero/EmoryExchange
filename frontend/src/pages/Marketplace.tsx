import React, { useState, useEffect } from 'react';
import api from '../api';

interface Listing {
  LID: number;
  title: string;
  description: string;
  tag: string;
  amount: number;
  status: string;
  ldate: string | Date;
}

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [listings, setListings] = useState<Listing[]>([])

  const fetchListings = () => {
    api.post(route, )
        .then(response => {
            console.log(response)
            setListings(response.data)
        })
        .catch(error => {
            console.error("Error fetching listings:", error)
        })
  }

  // replace array with listings var
  useEffect(() => {
    fetchListings()
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      {/* Search and Filter Section */}
      <div className="w-full max-w-3xl bg-white shadow-md p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for freelancers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="tutoring">Tutoring</option>
          <option value="career-coaching">Career Coaching</option>
          <option value="moving-help">Moving Help</option>
          <option value="research">Research Assistance</option>
        </select>
      </div>

      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-[#0c2b9c] mb-6">Marketplace</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Browse and connect with Emory freelancers offering services like tutoring, career coaching, dorm help, and more.
      </p>
      <div className="mt-4">
          <h1 className="text-4xl text-center font-bold mb-4">Listings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {listings.map((listing) => (
              <div
                key={listing.LID}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
              >
                <h3 className="text-xl font-bold text-[#0c2b9c] mb-2 text-center w-full">
                  {listing.title}
                </h3>
                <p className="text-gray-700 mb-2">{listing.description}</p>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                  {listing.tag}
                </span>
                <p className="mt-2 font-semibold">Amount: ${listing.amount}</p>
                <p className={`mt-1 ${listing.status === "live" ? "text-green-600" : "text-red-600"}`}>
                  Status: {listing.status}
                </p>
                <p className="mt-2 font-semibold">{new Date(listing.ldate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}