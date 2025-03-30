import React, { FormEvent, useState, ChangeEvent } from 'react'
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddListing() {
    const backendUrl = import.meta.env.VITE_API_URL

    const [amount, setAmount] = useState<string | number>("")
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [recurring, setRecurring] = useState(false)
    const [tag, setTag] = useState("notag")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(selectedFile);
            setImagePreview(previewUrl);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        setLoading(true)
        e.preventDefault()
        
        // Basic validation
        if (!title.trim()) {
            alert("Please enter a title")
            setLoading(false)
            return
        }
        
        if (!amount && tag !== 'free') {
            alert("Please enter an amount")
            setLoading(false)
            return
        }
        
        try {
            const listingData = new FormData()
            
            // Append all the form fields to FormData
            listingData.append('title', title)
            listingData.append('description', description)
            listingData.append('tag', tag)
            listingData.append('status', 'live')

            if (recurring === true) {
                listingData.append('recurring', "True")
            } else {
                listingData.append('recurring', "False")
            }
            
            // Only append amount if not free
            if (tag === 'free') {
                listingData.append('amount', '0')
            } else {
                listingData.append('amount', amount.toString())
            }
            
            // Append image if selected
            if (image) {
                listingData.append('img', image)
            }
            
            // Log FormData contents for debugging
            for (let [key, value] of listingData.entries()) {
                console.log(`${key}: ${value}`)
            }
            
            const response = await api.post('/api/auth/listing/', listingData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            console.log("listing created:", response)
            alert("Listing created successfully!")
            navigate("/profile")
        } catch (error: any) {
            console.error("Create listing error:", error)
            if (error.response?.data) {
                alert(`Error: ${JSON.stringify(error.response.data)}`)
            } else {
                alert("Error creating listing. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    // Show/hide amount field based on if the tag is free
    const showAmountField = tag !== 'free';

    return (
        <div>
            <nav className="p-8 sticky top-0 z-[100] border-b-blue-700 bg-[#efefee] shadow-md">
                <header className="md:px-6 prose prose-xl mx-auto flex justify-between flex-row text-[#0c2b9d] hover:text-blue-600 transition-colors">
                    <Link className="text-2xl font-bold grid place-content-center mb-2 md:mb-0 font-(family-name:Jockey-One) cursor-pointer" to="/profile" aria-label="Back to Profile">
                        <h1>← Back</h1>
                    </Link>

                </header>
            </nav>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center px-4 py-8">
                <h1 className="text-4xl font-bold mb-6">Create a New Listing</h1>

                <div className="w-full max-w-md space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-xl font-semibold mb-2">Title</label>
                        <input
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            value={title}
                            name="title"
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a descriptive title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="tag" className="block text-xl font-semibold mb-2">Category</label>
                        <select
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={tag}
                            name="tag"
                            id="tag"
                            onChange={(e) => setTag(e.target.value)}
                            required
                        >
                            <option value="notag">No Tag</option>
                            <option value="clothing">Clothing</option>
                            <option value="misc">Miscellaneous</option>
                            <option value="electronics">Electronics</option>
                            <option value="schoolsupp">School Supplies</option>
                            <option value="free">Free</option>
                            <option value="transport">Transport</option>
                            <option value="service">Service</option>
                            <option value="tutoring">Tutoring</option>
                            <option value="careercoach">Career Coaching</option>
                            <option value="moving">Moving Help</option>
                            <option value="researchassist">Research Assistance</option>
                        </select>
                    </div>

                    {showAmountField && (
                        <div>
                            <label htmlFor="amount" className="block text-xl font-semibold mb-2">Price</label>
                            <input
                                className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                type="number"
                                value={amount}
                                name="amount"
                                id="amount"
                                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                                placeholder="Enter price"
                                min="0"
                                step="0.01"
                                required={tag !== 'free'}
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="description" className="block text-xl font-semibold mb-2">Description</label>
                        <textarea
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your item or service in detail"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-xl font-semibold mb-2">Upload Image</label>
                        <input
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm mb-2">Image Preview:</p>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-h-40 max-w-full object-contain rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="recurring" className="block text-xl font-semibold mb-2">Is this a recurring service?</label>
                        <select
                            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={recurring.toString()}
                            name="recurring"
                            id="recurring"
                            onChange={(e) => setRecurring(e.target.value === "true")}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        {loading ? (
                            <div className="flex justify-center items-center p-4 bg-blue-100 text-blue-800 rounded-lg">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating listing...
                            </div>
                        ) : (
                            <button
                                className="w-full p-4 bg-[#0c2b9c] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                                type="submit"
                            >
                                Create Listing
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}