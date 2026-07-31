import { lazy, Suspense, useEffect, useState } from 'react';
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
import Loader from './Components/Loader/Loader';
import SEO from './Components/SEO/SEO';

const Login = lazy(() => import('./Components/Admin/Login'));
const Dashboard = lazy(() => import('./Components/Admin/Dashboard'));
const Chatbot = lazy(() => import('./Components/Chatbot/Chatbot'));
const Terms = lazy(() => import('./Components/Legal/Terms'));
const Privacy = lazy(() => import('./Components/Legal/Privacy'));

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
        const timer = setTimeout(() => setShowLoader(false), 450);
        return () => clearTimeout(timer);
      }
    }
  }, [profileStatus, skillsStatus]);

  return (
    <>
      <SEO />
      {showLoader && <Loader />}
      <div style={{ opacity: showLoader ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <NavBar />
        <Hero />
        <About />
        <MyWork />
        <Contact />
        <Footer />
        <Suspense fallback={null}>
          <Chatbot />
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
