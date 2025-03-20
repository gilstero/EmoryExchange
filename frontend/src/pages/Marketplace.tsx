import React, { useState, useEffect } from 'react';
import api from '../api';
import MarketPlaceNav from '../components/MarketPlaceNav';

interface Listing {
  id: number;
  user: User
  title: string;
  description: string;
  tag: string;
  amount: number;
  status: string;
  ldate: string | Date;
}

interface User {
  id: number;
  email: string;
  password: string;
  phone_num: string;
  profile_name: string;
  propic: string;
  real_name: string
}

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [listings, setListings] = useState<Listing[]>([])
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchListings = () => {
    api.get('/api/auth/listing/')
        .then(response => {
            console.log(response)
            setListings(response.data)
        })
        .catch(error => {
            console.error("Error fetching listings:", error)
        })
  }

  useEffect(() => {
    fetchListings()
  }, []);

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing)
    setIsOpen(true)
  }

  const closeListing = () => {
    setIsOpen(false)
    setSelectedListing(null)
  }

  const filteredListings = listings.filter(listing => {
    const matchSearch = listing.title.toLowerCase().includes(search.toLowerCase()) || listing.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filter ? listing.tag === filter : true
    return matchSearch && matchCategory
  })

  return (
    <>
    <MarketPlaceNav />
    <div className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#0c2b9c] mt-4 mb-6">Marketplace</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
        Browse and connect with Emory freelancers offering services like tutoring, career coaching, dorm help, and more.
      </p>
      <div className="w-full max-w-3xl bg-white shadow-md p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="tutoring">Tutoring</option>
          <option value="careercoach">Career Coaching</option>
          <option value="moving-help">Moving Help</option>
          <option value="schoolsupp">School Supplies</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start cursor-pointer"
                onClick={() => handleListingClick(listing)}
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
            ))
            ) : <div className="text-center text-xl">No Listings Found</div>}
          </div>
        </div>

        {isOpen && selectedListing && (
          <div className="fixed inset-0 bg-[rgba(239,239,238,0.8)] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-[#0c2b9c]">{selectedListing.title}</h2>
                <button 
                  onClick={closeListing} 
                  className="text-gray-500 hover:text-gray-700 text-3xl cursor-pointer"
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Listing Details</h3>
                  <p className="mb-2"><span className="font-medium">Description:</span> {selectedListing.description}</p>
                  <p className="mb-2"><span className="font-medium">Category:</span> <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">{selectedListing.tag}</span></p>
                  <p className="mb-2"><span className="font-medium">Amount:</span> ${selectedListing.amount}</p>
                  <p className="mb-2">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-sm ${selectedListing.status === "live" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {selectedListing.status}
                    </span>
                  </p>
                  <p className="mb-2"><span className="font-medium">Date Posted:</span> {new Date(selectedListing.ldate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="flex items-center mb-4">
                    {selectedListing.user.propic ? (
                      <img 
                        src={selectedListing.user.propic} 
                        alt={selectedListing.user.profile_name} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <span className="text-[8px] text-gray-500">{selectedListing.user.profile_name}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-lg">{selectedListing.user.profile_name}</p>
                      <p className="text-gray-600">{selectedListing.user.real_name}</p>
                    </div>
                  </div>
                  <p className="mb-2"><span className="font-medium">Email:</span> {selectedListing.user.email}</p>
                  <p className="mb-2"><span className="font-medium">Phone:</span> {selectedListing.user.phone_num}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <a
                  href={`mailto:${selectedListing.user.email}`}
                  className="bg-[#0c2b9c] hover:bg-blue-800 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Contact Seller
                </a>
              </div>
            </div>
          </div>
        )}

    </div>
    </>
  )
}