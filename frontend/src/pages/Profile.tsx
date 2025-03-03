
import React, { useState, useEffect } from 'react';
import api from '../api';
import MarketPlaceNav from '../components/MarketPlaceNav';

interface Listing {
  id: number;
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

export default function Profile() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [listings, setListings] = useState<Listing[]>([])
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    password: '',
    phone_num: '',
    profile_name: '',
    propic: '',
    real_name: ''
  })

  const fetchUser = () => {
    api.get('/api/auth/user/')
        .then(response => {
            console.log("user", response)
            setUser(response.data)
        })
        .catch(error => {
            console.error("Error fetching listings:", error)
        })
  }

  const fetchListings = () => {
    api.get('/api/auth/listing/')
        .then(response => {
            console.log("listing", response)
            setListings(response.data)
        })
        .catch(error => {
            console.error("Error fetching listings:", error)
        })
  }

  useEffect(() => {
    fetchListings()
    fetchUser()
  }, []);

  console.log(user, listings)

  const pfp = user.propic || "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"

  return (
    <>
    <MarketPlaceNav />
    <div className="flex min-h-screen bg-[#efefee]">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-6 shadow-md rounded-lg mt-6 mx-4 flex flex-col gap-4 items-center h-full">
          <img src={pfp} alt="Profile Picture" className="w-50 h-50 rounded-full mt-6 mb-6" />
          <p className="text-xl font-bold text-[#0c2b9c]">{user.real_name}</p>
          <p className="text-sm text-gray-700">{user.email}</p>
          <p className="text-sm text-gray-700 mb-6">{user.phone_num}</p>
        </div>

        {/* Listings */}
        <div className="w-3/4 p-6 ml-2 flex flex-col">
          <div className="bg-white p-6 shadow-md rounded-lg mb-4">
            <h1 className="text-4xl font-bold text-[#0c2b9c] mb-6">Manage Profile</h1>
            <p className="text-lg text-gray-700 mb-4">View and manage your listings below.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
              >
                <h3 className="text-xl font-bold text-[#0c2b9c] mb-2">{listing.title}</h3>
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
    </>
  )
}