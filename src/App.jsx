import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from './features/profile/profileSlice';
import { fetchSkills } from './features/skills/skillsSlice';
import NavBar from './Components/Navbar/NavBar';
import Hero from './Components/Hero/Hero';
import MyWork from './Components/MyWork/MyWork';
import Services from './Components/Services/Services';
import Testimonials from './Components/Testimonials/Testimonials';
import Recognition from './Components/Recognition/Recognition';
import BlogNotes from './Components/BlogNotes/BlogNotes';
import TechStrip from './Components/TechStrip/TechStrip';
import Contact from './Components/Contact/Contact';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import InteractiveEffects from './Components/InteractiveEffects/InteractiveEffects';
import Loader from './Components/Loader/Loader';
import SEO from './Components/SEO/SEO';

const Login = lazy(() => import('./Components/Admin/Login'));
const Dashboard = lazy(() => import('./Components/Admin/Dashboard'));
const Chatbot = lazy(() => import('./Components/Chatbot/Chatbot'));
const VRMode = lazy(() => import('./Components/VRMode/VRMode'));
const Terms = lazy(() => import('./Components/Legal/Terms'));
const Privacy = lazy(() => import('./Components/Legal/Privacy'));

function Home() {
  const dispatch = useDispatch();
  const profileStatus = useSelector((state) => state.profile.status);
  const skillsStatus = useSelector((state) => state.skills.status);
  const [showLoader, setShowLoader] = useState(true);
  const [isVROpen, setIsVROpen] = useState(false);
  
  useEffect(() => {
    if (profileStatus === 'idle') dispatch(fetchProfile());
    if (skillsStatus === 'idle') dispatch(fetchSkills());
  }, [profileStatus, skillsStatus, dispatch]);

  useEffect(() => {
    if (profileStatus === 'succeeded' || profileStatus === 'failed') {
      if (skillsStatus === 'succeeded' || skillsStatus === 'failed') {
        const timer = setTimeout(() => setShowLoader(false), 350);
        return () => clearTimeout(timer);
      }
    }
  }, [profileStatus, skillsStatus]);

  return (
    <>
      <SEO />
      <InteractiveEffects />
      {showLoader && <Loader />}
      <div style={{ opacity: showLoader ? 0 : 1, transition: 'opacity 0.4s ease-in-out' }}>
        {/* Editorial Frame matching reference image */}
        <main className="editorial-container">
          {/* Top Minimal Navbar with VR Mode trigger */}
          <NavBar onOpenVR={() => setIsVROpen(true)} />
          <Hero onOpenVR={() => setIsVROpen(true)} />
          <MyWork />
          <Services />
          <Testimonials />
          <Recognition />
          <BlogNotes />
          <TechStrip />
          <Contact />
        </main>

        {/* Floating Interactive Music Player with Free Audio Library */}
        <MusicPlayer />

        {/* Floating AI Chatbot Assistant */}
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>

        {/* 3D WebXR / VR Holodeck Mode */}
        <Suspense fallback={null}>
          <VRMode isOpen={isVROpen} onClose={() => setIsVROpen(false)} />
        </Suspense>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <>
                <SEO
                  title="Admin Login | Syed Farman Ali Portfolio"
                  description="Private admin login for managing Syed Farman Ali's portfolio content."
                  path="/login"
                  robots="noindex, nofollow"
                />
                <Login />
              </>
            }
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <SEO
                  title="Admin Dashboard | Syed Farman Ali Portfolio"
                  description="Private dashboard for portfolio content management."
                  path="/dashboard"
                  robots="noindex, nofollow"
                />
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
