import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Description from './components/Description'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

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
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
