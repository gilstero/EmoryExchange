import React, { FormEvent, useState } from 'react'
import api from '../api';
import { useNavigate } from 'react-router';

// profile_name = models.CharField(max_length=255, blank=True, null=True)
//     real_name = models.CharField(max_length=255, blank=True, null=True)
//     phone_num = models.CharField(max_length=20, blank=True, null=True)
//     propic = models.URLField(null=True, blank=True)

export default function EditProfile() {
    const [profileName, setProfileName] = useState("")
    const [realName, setRealName] = useState("")
    const [phone, setPhone] = useState("")
    const [pfp, setPfp] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        
        try {
            const response = await api.post('/api/auth/user/', {
                profile_name: profileName,
                real_name: realName,
                phone_num: phone,
                propic: pfp
            })
            
            console.log("user completed:", response)
            alert("Profile completed successfully!")
            navigate("/marketplace")
        } catch (error: any) {
            console.error("Create listing error:", error)
            if (error.response?.data) {
                // If the server returns specific error messages
                alert(`Error: ${JSON.stringify(error.response.data)}`)
            } else {
                alert("Error creating listing. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-6">Complete Your Profile</h1>

                <div className="w-full max-w-md space-y-4">
                    <div>
                        <label htmlFor="profileName" className="block text-xl font-semibold mb-2">Username</label>
                        <input
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            value={profileName}
                            name="profileName"
                            id="profileName"
                            onChange={(e) => setProfileName(e.target.value)}
                            placeholder="Enter a descriptive title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="realName" className="block text-xl font-semibold mb-2">Full Name</label>
                        <input
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            value={realName}
                            name="realName"
                            id="realName"
                            onChange={(e) => setRealName(e.target.value)}
                            placeholder="Enter a descriptive title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-xl font-semibold mb-2">Phone Number</label>
                        <input
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            name="phone"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Describe your item or service in detail"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="pfp" className="block text-xl font-semibold mb-2">Profile Picture URL</label>
                        <input
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="url"
                            value={pfp}
                            name="pfp"
                            id="pfp"
                            onChange={(e) => setPfp(e.target.value)}
                            placeholder="Enter image URL (optional)"
                        />
                    </div>


                    <div className="pt-4">
                        {loading ? (
                            <div className="flex justify-center items-center p-4 bg-blue-100 text-blue-800 rounded-lg">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </div>
                        ) : (
                            <button
                                className="w-full p-4 bg-[#0c2b9c] text-white font-semibold rounded-lg shadow-md hover:bg-[#0a2280] transition-colors"
                                type="submit"
                            >
                                Complete Profile
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}