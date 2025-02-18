import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Listing from "../components/Listing";
import AccountProfile from "../components/AccountProfile";

export default function Account() {
  const name: string = "Example Exampler";
  const email: string = "example@gmail.com";
  const phoneNum: string = "123-456-7890";
  return (
    <div className="flex flex-col items-center min-h-screen overflow-hidden">
      <Navbar />
      <div className="flex felx-row w-full px-10 py-8 gap-x-10">
        <div className="w-1/4">
          <AccountProfile name={name} email={email} phoneNum={phoneNum} />
        </div>
        <div className="w-3/4 mx-auto rounded-lg border border-black p-4 h-150 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4 center">{name}'s Listings</h1>
          <div className="grid grid-cols-3 gap-6">
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
          </div>
        </div>
      </div>
    </div>
  );
}
