
import NavBar from './Components/Navbar/NavBar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import MyWork from './Components/MyWork/MyWork'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import React, { useRef, useState,useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
function App() {
  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#main'),
      smooth: true
    });
    const tl = gsap.timeline();
    tl.to("#home",{
      y:"100vh",
      scale:0.5,
      duration:0
  })
  tl.to("#home",{
      y:"40vh",
      duration:1,
      delay:1
  })
  tl.to("#home",{
      y:"0vh",
      rotate:360,
      scale:1,
      duration:3
  })

    // Cleanup on unmount
    return () => {
      scroll.destroy();
    };
  }, []);
  return (
  <div id='main'>
  <NavBar/>
  <Hero/>
  <About/>
  <MyWork/>
  <Contact/>
  <Footer/>
 </div>
  )
}

export default App
