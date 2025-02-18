import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Listing from "../components/Listing";

export default function Account() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Navbar />
      <Listing />
    </div>
  );
}
