import React from "react";
import { Link, useLocation } from "react-router-dom";

interface ListingProps {
  title?: string;
  image?: string;
  description?: string;
  price?: string;
  status?: string;
  linkToListing?: string;
}

export default function Listing({
  title = "Example Listing",
  image = "https://picsum.photos/200",
  description = "Example Description",
  price = "$100.10",
  status = "Live",
}: ListingProps) {
  return (
    <>
      <div className="bg-[#f0f0f0] hover:border hover:border-[#0c2b9c] hover:scale-105 max-w-sm h-auto p-2 rounded-lg shadow-xl transition-shadow">
        {/* Listing title */}
        <h2 className="text-lg font-bold mb-2 text-[black] text-center">
          {title}
        </h2>
        {/* Listing image */}
        <img src={image} className="w-full h-36 p-2 rounded-md" />
        <div className="p-2">
          {/* Listing description */}
          <p className="text-sm mb-2 text-[black]">{description}</p>
          {/* Listing price */}
          <p className="text-sm font-bold mb-2 text-[black]">Amount: {price}</p>
          {/* Listing status */}
          <p className="text-sm font-bold mb-2 text-[black]">
            Status: {status}
          </p>
        </div>
      </div>
    </>
  );
}
