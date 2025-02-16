import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Description from './components/Description';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace'; // Import the new page

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
        <Route path="/marketplace" element={<Marketplace />} /> {/* New Route */}
      </Routes>
    </>
  );
}

export default App;