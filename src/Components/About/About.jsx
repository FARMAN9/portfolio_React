import React from 'react'
import'./About.css'
import bac from '../../assets/bac.svg'
import profile from '../../assets/profile.jpg'


function About() {
    const skills = [
        { name: 'JavaScript', value: 70 },
        { name: 'Python', value: 80 },
        { name: 'Java', value: 50 },
        { name: 'HTML', value: 75 },
        { name: 'CSS', value: 70 },
        { name: 'Django', value: 0 },
        
      ];
      
  return (
    <div id='about' className='about'>
        <div className="about-title">
            <h1>About me</h1>
            <img src={bac} alt="" />
        </div>
        <div className="about-sections">
        <div className="about-left">
        <img src={profile} alt="" /> 
       </div>
       <div className="about-right">
       <div className="about-para">
        <p>I am an experienced Full Stack Developer with over a 1 year of professional expertise in the field. Throughout my career, I have had the privilege of collaborating with prestigious organizations, contributing to their success and growth.</p>
        <p>My passion for frontend development is not only reflected in my extensive experience but also in the enthusiasm and dedication I bring to each project.</p>
       </div>
       <div className="about-skills">
        {
            skills.map((skill)=><div className="about-skill" key={skill.name}><p>{skill.name}</p><hr style={{width:`${skill.value}%`}} /></div>)
        }
        
      </div>
        </div>
        </div>
        <div className="about-achievements">
<div className="about-achievement">
<h1>1</h1>
<p>YEAR OF EXPERIENCE</p>
</div>
<hr />
<div className="about-achievement">
<h1>4+</h1>
<p>PROJECTS COMPLETED</p>
</div>
<hr />
<div className="about-achievement">
<h1>2+</h1>
<p>HAPPY CLIENTS</p>
</div>
</div>
    </div>
  )
}

export default About
