import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Description from "./components/Description";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Marketplace from "./pages/Marketplace";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Main />
              <Description />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
