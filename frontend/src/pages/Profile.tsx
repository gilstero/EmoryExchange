import { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import MarketPlaceNav from '../components/MarketPlaceNav';
import NoImage from '../assets/noimage.png'

interface Listing {
  id: number;
  user: User;
  title: string;
  description: string;
  tag: string;
  amount: number;
  status: string;
  ldate: string | Date;
  img: File;
}

interface User {
  id: number;
  email: string;
  password: string;
  phone_num: string;
  profile_name: string;
  propic: File;
  real_name: string
}

export default function Profile() {
  const backendUrl = import.meta.env.VITE_API_URL

  const [listings, setListings] = useState<Listing[]>([])
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    password: '',
    phone_num: '',
    profile_name: '',
    propic: null as unknown as File,
    real_name: ''
  })

  const fetchUser = () => {
    api.get('/api/auth/user/')
        .then(response => {
            // console.log("user", response)
            setUser(response.data)
        })
        .catch(error => {
            console.error("Error fetching user:", error)
        })
  }

  const fetchListings = () => {
    api.get('/api/auth/listingprofile/')
        .then(response => {
            // console.log("listing", response)
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

  // const filteredListings = listings.filter(listing => {
  //   const matchUser = listing.user.id === user.id
  //   return matchUser
  // })

  const pfp = user.propic ? `${backendUrl}${user.propic}` : "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg"

  return (
    <>
    <MarketPlaceNav />
    <div className="container mx-auto px-4 py-8 bg-[#efefee]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-white p-6 shadow-md rounded-lg flex flex-col gap-6 items-center max-h-100">
          <img 
            src={pfp} 
            alt="Profile" 
            style={{ width: "150px", borderRadius: "50%" }} 
          />
          <p className="text-xl font-bold text-[#0c2b9c] text-center">{user.real_name}</p>
          <p className="text-sm text-gray-700 text-center">{user.email}</p>
          <p className="text-sm text-gray-700 text-center mb-4">({user.phone_num.slice(0,3)}) {user.phone_num.slice(3,6)}-{user.phone_num.slice(6,10)}</p>
        </div>

        {/* Listings Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white p-6 shadow-md rounded-lg flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#0c2b9c] mb-2">Manage Profile</h1>
              <p className="text-gray-700">View and manage your listings below.</p>
            </div>
            <Link to="/add-listing" className="p-4 bg-[#0c2b9c] text-white rounded-xl cursor-pointer font-bold">Create a Listing</Link>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full"
                >
                  <h3 className="text-lg font-bold text-[#0c2b9c] mb-2 truncate">{listing.title}</h3>
                  <div className="flex justify-center">
                    <img 
                      src={listing.img ? (
                        typeof listing.img === 'string' 
                          ? `${backendUrl}${listing.img}` 
                          : URL.createObjectURL(listing.img)
                      ) : NoImage}
                      className="w-50 h-50 self-center object-cover"
                      onError={(e) => {
                        e.currentTarget.src = NoImage;
                      }}
                    />
                  </div>
                  <p className="text-gray-700 mb-2 line-clamp-3">{listing.description}</p>
                  <div className="mt-auto">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs mb-2 inline-block">
                      {listing.tag}
                    </span>
                    <p className="font-semibold text-sm">Amount: ${listing.amount}</p>
                    <p className={`text-sm ${listing.status === "live" ? "text-green-600" : "text-red-600"}`}>
                      Status: {listing.status}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(listing.ldate).toLocaleDateString()}
                      </p>
                      <Link
                        to={`/edit-listing/${listing.id}`}  
                        className="border-2 border-[#0c2b9c] px-2 py-1 cursor-pointer text-sm rounded-lg text-[#0c2b9c]"
                      >Edit</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                No Listings Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}