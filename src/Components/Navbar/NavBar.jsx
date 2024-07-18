import React from 'react';
import './Navbar.css';
import ali from '../../assets/ali.png'



function NavBar() {
  return (
    <nav className='navbar'>
      <div className='logo'>
      <h1>FARMAN</h1>
      <img src={ali} alt="" />
      </div>
           
            <ul className='nav-menu'>
             <li>Home</li>
             <li>About Me</li>
             <li>Services</li>
             <li>Portfolio</li>
             <li>Contact</li>
            </ul>
            <div className="nav-connect">Connect With Me</div>
       
    </nav>
  )
}

export default NavBar
