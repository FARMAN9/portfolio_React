import { useSelector } from 'react-redux';
import './About.css';
import bac from '../../assets/bac.svg';
import profileImg from '../../assets/profile.jpg';

function About() {
  const skills = useSelector((state) => state.skills.items);
  const profileData = useSelector((state) => state.profile.data) || {};
      
  return (
    <div id='about' className='about'>
      
        <div className="about-title">
            <span>Profile</span>
            <h1>About me</h1>
            <img src={bac} alt="" />
        </div>
        <div className="about-sections glass-panel">
        <div className="about-left">
        <img src={profileImg} alt="" /> 
       </div>
       <div className="about-right">
       <div className="about-para">
        <p>{profileData.aboutPara1}</p>
        <p>{profileData.aboutPara2}</p>
       </div>
       <div className="about-focus">
        {(profileData.focusAreas || ["React", "MERN", "Python", "Django", "Machine Learning"]).map((item) => (
          <span key={item}>{item}</span>
        ))}
       </div>
       <div className="about-resume">
        <div>
          <span>Education</span>
          <p>University of Kashmir</p>
        </div>
        <div>
          <span>Resume focus</span>
          <p>MERN, Python/Django, React Native, machine learning, and deployable web products</p>
        </div>
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
<h1>{profileData.experienceYears}</h1>
<p>YEAR OF EXPERIENCE</p>
</div>
<hr />
<div className="about-achievement">
<h1>{profileData.projectsCompleted}</h1>
<p>PROJECTS COMPLETED</p>
</div>
<hr />
<div className="about-achievement">
<h1>{profileData.happyClients}</h1>
<p>HAPPY CLIENTS</p>
</div>
<hr />
<div className="about-achievement">
<h1>{profileData.publicRepos || "41"}</h1>
<p>PUBLIC REPOSITORIES</p>
</div>
</div>
    </div>
  )
}

export default About;
