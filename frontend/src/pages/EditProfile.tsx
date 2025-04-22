import React, { FormEvent, useState, useRef, useEffect } from 'react'
import api from '../api';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function EditProfile() {
    const backendUrl = import.meta.env.VITE_API_URL

    const [profileName, setProfileName] = useState("")
    const [realName, setRealName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [pfp, setPfp] = useState<File | null>(null)
    const [pfpPreview, setPfpPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const fetchUserData = async () => {
        try {
            const response = await api.get('/api/auth/user/')
            const userData = response.data
            
            // console.log(userData)
            
            setProfileName(userData.profile_name || '')
            setRealName(userData.real_name || '')
            setEmail(userData.email || '')
            setPhone(userData.phone_num || '')
            setPfpPreview(`${backendUrl}${userData.propic}` || null)
        } catch (error) {
            console.error("Error fetching user data", error)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif']
            const maxSize = 5 * 1024 * 1024 // 5 MB

            if (!validTypes.includes(file.type)) {
                return
            }

            if (file.size > maxSize) {
                return
            }

            setPfp(file)
            
            const reader = new FileReader()
            reader.onloadend = () => {
                setPfpPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        
        try {
            const profileData = new FormData()

            if (phone.length !== 10) {
                alert("Phone number must be exactly 10 digits")
                return
            }
    
            // Only append if values are non-empty
            if (profileName) {
                profileData.append('profile_name', profileName)
            }
            if (realName) {
                profileData.append('real_name', realName)
            }
            if (phone) {
                profileData.append('phone_num', phone)
            }
            if (pfp) {
                profileData.append('propic', pfp)
            }

            console.log(profileData)
            
            // Log FormData contents for debugging
            // for (let [key, value] of profileData.entries()) {
            //     console.log(`${key}: ${value}`)
            // }

            const response = await api.patch('/api/auth/user/', profileData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            // console.log("Profile updated:", response)
            alert("Profile updated successfully!")
            navigate("/profile")
        } catch (error: any) {
            console.error("Update profile error:", error)
            if (error.response?.data) {
                // More detailed error handling
                const errorDetails = error.response.data
                const errorMessages = Object.entries(errorDetails)
                    .map(([field, errors]) => `${field}: ${errors}`)
                    .join('\n')
                
                alert(`Error updating profile:\n${errorMessages}`)
            } else {
                alert("Error updating profile. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="min-h-screen">
            <nav className="p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#efefee] shadow-md">
                <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9d] hover:text-blue-600 transition-colors">
                    <Link className="text-2xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/profile" aria-label="Back to Profile">
                        <h1>← Back</h1>
                    </Link>

                </header>
            </nav>

            <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/jpeg,image/png"
                            className="hidden"
                        />
                        
                        <div 
                            onClick={triggerFileInput}
                            className="w-32 h-32 rounded-full border-4 border-[#0c2b9d] cursor-pointer hover:border-blue-700 transition-all relative"
                        >
                            {pfpPreview ? (
                                <img 
                                    src={pfpPreview} 
                                    aria-label="Profile Preview"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-[#0c2b9d]">
                                    Upload Photo
                                </div>
                            )}
                            <div className="absolute bottom-0 right-0 bg-white rounded-4xl p-2 border-2 border-[#0c2b9d]">
                                📸
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="profileName" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="profileName"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Choose a username"
                                maxLength={20}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="realName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="realName"
                                value={realName}
                                onChange={(e) => setRealName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your full name"
                                maxLength={30}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                placeholder="Your email"
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => {
                                    let cleaned = e.target.value.replace(/\D/g, "")
                                    if (cleaned.length > 10) return
                                    setPhone(cleaned)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your phone number"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#0c2b9d] text-white font-semibold rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
