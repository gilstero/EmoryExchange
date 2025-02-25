import React, { useState } from 'react';
import axios from 'axios';

interface Listing {
  LID?: number;
  title: string;
  description: string;
  tag: string;
  amount: number;
  status: string;
  user: number;  // ✅ Ensure user is a number, not a string
}

export default function NewListing() {
  const [newListing, setNewListing] = useState<Listing>({
    title: "",
    description: "",
    tag: "notag",
    amount: 0.0,
    status: "live",
    user: 2,  // ✅ Use Matty's ID as a number
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setNewListing((prevListing) => ({
      ...prevListing,
      [name]: name === "amount" ? (value ? parseFloat(value) : 0) : value,
    }));
  };

  const submitListing = async () => {
    console.log("Submitting data:", JSON.stringify(newListing));

    axios.post("http://127.0.0.1:8000/listing/", newListing)
      .then(response => {
        console.log("Response:", response);
        alert("Listing created successfully!");
        setNewListing({
          title: "",
          description: "",
          tag: "notag",
          amount: 0.0,
          status: "live",
          user: 2, // ✅ Keep user ID fixed
        });
      })
      .catch(error => {
        console.error("Error submitting listing:", error);
        alert("Failed to create listing.");
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#0c2b9c] mb-6">Create New Listing</h1>

      <div className="w-full max-w-3xl bg-white shadow-md p-6 rounded-lg">
        <label className="block mb-2 font-semibold">Title:</label>
        <input type="text" name="title" value={newListing.title} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded-lg mb-4" />

        <label className="block mb-2 font-semibold">Description:</label>
        <textarea name="description" value={newListing.description} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded-lg mb-4"></textarea>

        <label className="block mb-2 font-semibold">Category:</label>
        <select name="tag" value={newListing.tag} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded-lg mb-4">
          <option value="notag">No Tag</option>
          <option value="clothing">Clothing</option>
          <option value="misc">Miscellaneous</option>
          <option value="electronics">Electronics</option>
          <option value="schoolsupp">School Supplies</option>
          <option value="free">Free</option>
          <option value="transport">Transport</option>
          <option value="service">Service</option>
        </select>

        <label className="block mb-2 font-semibold">Amount ($):</label>
        <input type="number" name="amount" value={newListing.amount} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded-lg mb-4" />

        <label className="block mb-2 font-semibold">Status:</label>
        <select name="status" value={newListing.status} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg mb-4">
          <option value="live">Live</option>
          <option value="archived">Archived</option>
          <option value="deleted">Deleted</option>
        </select>

        <button onClick={submitListing} className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Submit Listing
        </button>
      </div>
    </div>
  );
}