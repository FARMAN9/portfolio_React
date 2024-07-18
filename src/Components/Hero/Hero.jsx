import React from 'react'
import './Hero.css'
import profile from '../../assets/profile.jpg'

function Hero() {
  return (
    <div className='hero'>
        <img src={profile} alt="profile" />
       <h1><span>I'm Syed Farman Ali,</span> full stack developer based in India</h1>
       <p>I am from jammu and kashmir,with 1 year of experience in multiple companies,organizations like Jammu and kashmir police(CID) and Ahirbal . </p>
       <div className="hero-action">
       <div className="hero-connect">Connect with me</div>
       <a className="hero-resume"href="https://rxresu.me/farman9/python-django-developer">My resume</a>
    </div>
    </div>

  )
}

export default Hero
