import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import api from '../api';
import { useNavigate, Link, useParams } from 'react-router-dom';
import MarketPlaceNav from '../components/MarketPlaceNav';

interface Listing {
    id: number;
    user: User;
    title: string;
    description: string;
    tag: string;
    amount: number;
    status: string;
    ldate: string | Date;
    img: File | string;
}
  
interface User {
    id: number;
    email: string;
    password: string;
    phone_num: string;
    profile_name: string;
    propic: File | string;
    real_name: string
}

export default function AddListing() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_API_URL

    const [listing, setListing] = useState<Listing>({
        id: 0,
        user: {
          id: 0,
          email: '',
          password: '',
          phone_num: '',
          profile_name: '',
          propic: null as unknown as File,
          real_name: ''
        },
        title: '',
        description: '',
        tag: '',
        amount: 0,
        status: 'pending',
        ldate: new Date(),
        img: null as unknown as File
    });

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        
        // For amount field, convert to number
        if (name === 'amount') {
          setListing({
            ...listing,
            [name]: parseFloat(value) || 0
          });
        } else {
          setListing({
            ...listing,
            [name]: value
          })
        }
      }
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0]
          setImageFile(file)
          
          // Create a preview URL for the selected image
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreviewImage(reader.result as string)
          }
          reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        // Fetch the listing data
        const fetchListing = async () => {
          try {
            setIsLoading(true);
            const response = await api.get(`/api/auth/listingprofile/${id}`);

            console.log(response.data)

            setListing(response.data);
            if (response.data.img) {
              setPreviewImage(`${backendUrl}${response.data.img}`);
            }
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching listing:", error);
            setError("Failed to load listing. Please try again.");
            setIsLoading(false);
          }
        };
    
        fetchListing();
    }, [id, backendUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)
        
        try {
          setIsLoading(true)
          
          // Create form data to send to the server
          const formData = new FormData()
          formData.append('title', listing.title)
          formData.append('description', listing.description)
          formData.append('tag', listing.tag)
          formData.append('amount', listing.amount.toString())
          formData.append('status', listing.status)
          
          // Only append the image if a new one was selected
          if (imageFile) {
            formData.append('img', imageFile)
          }
          
          // Send the update request
          const response = await api.put(`/api/auth/listing/${id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          })
          
          setSuccessMessage("Listing updated successfully!")
          setIsLoading(false);
          
          navigate('/profile')
          
        } catch (error) {
          console.error("Error updating listing:", error)
          setError("Failed to update listing. Please try again.")
          setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
          try {
            setIsLoading(true)
            await api.delete(`/api/auth/listing/${id}/`)
            setSuccessMessage("Listing deleted successfully!")
            
            navigate('/profile')

          } catch (error) {
            console.error("Error deleting listing:", error)
            setError("Failed to delete listing. Please try again.")
            setIsLoading(false)
          }
        }
    }

    if (isLoading && !listing.title) {
        return (
          <>
            <MarketPlaceNav />
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
              <p className="text-xl">Loading...</p>
            </div>
          </>
        )
    }

    return (
        <>
          <MarketPlaceNav />
          <div className="container mx-auto px-4 py-8 bg-[#efefee] min-h-screen">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-[#0c2b9c] mb-6">Edit Listing</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {successMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={listing.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={listing.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select
                    name="tag"
                    value={listing.tag}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="tutoring">Tutoring</option>
                    <option value="careercoach">Career Coaching</option>
                    <option value="moving-help">Moving Help</option>
                    <option value="schoolsupp">School Supplies</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={listing.amount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={listing.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Image</label>
                  {previewImage && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 mb-1">Current Image:</p>
                      <img 
                        src={previewImage} 
                        alt="Listing preview" 
                        className="w-40 h-40 object-cover border rounded"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to keep current image
                  </p>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="bg-[#0c2b9c] text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Listing'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
    )
}