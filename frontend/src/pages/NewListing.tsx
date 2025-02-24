import React, { useState } from "react";

export default function NewListing() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { title };

    try {
      const response = await fetch("http://localhost:8000/api/listings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Listing created successfully!");
        setTitle(""); // Clear the input after submission
      } else {
        alert("Failed to create listing.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting listing.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-100 p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Listing Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0c2b9c] text-white py-2 rounded-md hover:bg-[#0c2b9ce1] transition duration-300 cursor-pointer"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
}