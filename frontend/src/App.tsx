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
import Profile from './pages/Profile'
import AddListing from './pages/AddListing'
import FinishProfile from './pages/EditProfile'
import EditListing from './pages/EditListing'

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
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/add-listing" 
          element={
            <ProtectedRoute>
              <AddListing />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/edit-profile" 
          element={
            <ProtectedRoute>
              <FinishProfile />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/edit-listing/:id" 
          element={
            <ProtectedRoute>
              <EditListing />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
