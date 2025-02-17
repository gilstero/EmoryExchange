import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Description from './components/Description'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
            <>       
              <Navbar />
              <Main />
              <Description />
              <Footer />
            </>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
