import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from './features/profile/profileSlice';
import { fetchSkills } from './features/skills/skillsSlice';
import NavBar from './Components/Navbar/NavBar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import MyWork from './Components/MyWork/MyWork';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Login from './Components/Admin/Login';
import Dashboard from './Components/Admin/Dashboard';
import Chatbot from './Components/Chatbot/Chatbot';
import Terms from './Components/Legal/Terms';
import Privacy from './Components/Legal/Privacy';
import Loader from './Components/Loader/Loader';

function Home() {
  const dispatch = useDispatch();
  const profileStatus = useSelector((state) => state.profile.status);
  const skillsStatus = useSelector((state) => state.skills.status);
  const [showLoader, setShowLoader] = useState(true);
  
  useEffect(() => {
    if (profileStatus === 'idle') dispatch(fetchProfile());
    if (skillsStatus === 'idle') dispatch(fetchSkills());
  }, [profileStatus, skillsStatus, dispatch]);

  useEffect(() => {
    if (profileStatus === 'succeeded' || profileStatus === 'failed') {
      if (skillsStatus === 'succeeded' || skillsStatus === 'failed') {
        // Small delay to ensure smooth transition
        setTimeout(() => setShowLoader(false), 800);
      }
    }
  }, [profileStatus, skillsStatus]);

  return (
    <>
      {showLoader && <Loader />}
      <div style={{ opacity: showLoader ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <NavBar />
        <Hero />
        <About />
        <MyWork />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </>
  );
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
