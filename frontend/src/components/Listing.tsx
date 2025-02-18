import React from "react";
import { Link, useLocation } from "react-router-dom";

interface ListingProps {
  title?: string;
  image?: string;
  name?: string;
  email?: string;
  phoneNum?: string;
  linkToListing?: string;
  // tag: string;
}

export default function Listing({
  title = "Example Listing",
  image = "https://picsum.photos/200",
  name = "Example name",
  email = "Example email",
  phoneNum = "Example phone number",
}: ListingProps) {
  return (
    <>
      <div className="bg-[#0c2b9c] max-w-sm h-auto p-2 rounded-lg shadow-lg">
        {/* Listing title */}
        <h2 className="text-lg font-bold mb-2 text-[white] text-center">
          {title}
        </h2>
        {/* Listing image */}
        <img src={image} alt={name} className="w-full h-36 p-2 rounded-md" />
        <div className="p-2">
          {/* Listing name */}
          <p className="text-sm font-bold mb-2 text-[white]">{name}</p>
          {/* Listing email */}
          <p className="text-sm font-bold mb-2 text-[white]">{email}</p>
          {/* Listing phoneNum */}
          <p className="text-sm font-bold mb-2 text-[white]">{phoneNum}</p>
        </div>
      </div>
    </>
  );
}
