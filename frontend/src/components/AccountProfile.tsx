import React from "react";
import { Link } from "react-router-dom";

interface AccountProfileProps {
  pfp?: string; // If no pfp use a default image
  name?: string;
  email?: string;
  phoneNum?: string;
  recentListings?: string[];
}

export default function AccountProfile({
  pfp = "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
  name = "Example name",
  email = "Example email",
  phoneNum = "Example phone number",
}: AccountProfileProps) {
  return (
    <>
      <div className="bg-[#edecdf] w-80 h-90 p-2 rounded-lg">
        {/* Profile picture */}
        <img src={pfp} className="w-50 h-50 mt-3 mb-10 mx-auto rounded-full" />
        <div className="p-2">
          {/* Profile name */}
          <p className="text-sm font-bold mb-2 text-[black]">{name}</p>
          {/* Profile email */}
          <p className="text-sm font-bold mb-2 text-[black]">{email}</p>
          {/* Profile phoneNum */}
          <p className="text-sm font-bold mb-2 text-[black]">{phoneNum}</p>
        </div>
      </div>
    </>
  );
}
