import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { fetchProjects } from '../../features/projects/projectsSlice';
import { fetchSkills } from '../../features/skills/skillsSlice';
import { fetchProfile } from '../../features/profile/profileSlice';

function Dashboard() {
  const { token, username } = useSelector((state) => state.auth);
  const projects = useSelector((state) => state.projects.items);
  const skills = useSelector((state) => state.skills.items);
  const profile = useSelector((state) => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects');
  const [statusMsg, setStatusMsg] = useState('');

  // Project Form
  const [projectForm, setProjectForm] = useState({ id: null, w_no: '', name: '', imageUrl: '/projects/', link: '' });
  
  // Skill Form
  const [skillForm, setSkillForm] = useState({ id: null, name: '', value: '' });

  // Profile Form
  const [profileForm, setProfileForm] = useState({});

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile && Object.keys(profileForm).length === 0) {
      setProfileForm(profile);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // --- PROJECTS ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving Project...');
    try {
      const url = projectForm.id 
        ? `http://localhost:5000/api/projects/${projectForm.id}` 
        : 'http://localhost:5000/api/projects';
      const method = projectForm.id ? 'PUT' : 'POST';
      
      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(projectForm) });
      if (!res.ok) throw new Error('Failed to save project');
      
      setStatusMsg('Project saved!');
      setProjectForm({ id: null, w_no: '', name: '', imageUrl: '/projects/', link: '' });
      dispatch(fetchProjects());
    } catch (err) { setStatusMsg(err.message); }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE', headers: authHeaders });
      dispatch(fetchProjects());
      setStatusMsg('Project deleted');
    } catch (err) { setStatusMsg(err.message); }
  };

  // --- SKILLS ---
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving Skill...');
    try {
      const url = skillForm.id 
        ? `http://localhost:5000/api/skills/${skillForm.id}` 
        : 'http://localhost:5000/api/skills';
      const method = skillForm.id ? 'PUT' : 'POST';
      
      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(skillForm) });
      if (!res.ok) throw new Error('Failed to save skill');
      
      setStatusMsg('Skill saved!');
      setSkillForm({ id: null, name: '', value: '' });
      dispatch(fetchSkills());
    } catch (err) { setStatusMsg(err.message); }
  };

  const handleSkillDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE', headers: authHeaders });
      dispatch(fetchSkills());
      setStatusMsg('Skill deleted');
    } catch (err) { setStatusMsg(err.message); }
  };

  // --- PROFILE ---
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Saving Profile...');
    try {
      const res = await fetch('http://localhost:5000/api/profile', { 
        method: 'PUT', 
        headers: authHeaders, 
        body: JSON.stringify(profileForm) 
      });
      if (!res.ok) throw new Error('Failed to save profile');
      setStatusMsg('Profile saved!');
      dispatch(fetchProfile());
    } catch (err) { setStatusMsg(err.message); }
  };

  const inputStyle = { width: '100%', padding: '10px', margin: '5px 0 15px', borderRadius: '5px', border: 'none', background: '#161513', color: 'white' };
  const btnStyle = { padding: '10px 20px', borderRadius: '5px', border: 'none', background: 'linear-gradient(267deg, #DF8908 0.36%, #B415FF 102.06%)', color: 'white', cursor: 'pointer', fontWeight: 'bold' };

  return (
    <div style={{ minHeight: '100vh', background: '#161513', color: 'white', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2>System Dashboard</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {username}</span>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#32323b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {['projects', 'skills', 'profile'].map(tab => (
          <button 
            key={tab} 
            onClick={() => { setActiveTab(tab); setStatusMsg(''); }}
            style={{ padding: '10px 20px', background: activeTab === tab ? '#B415FF' : '#32323b', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textTransform: 'capitalize' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {statusMsg && <p style={{ color: 'lightgreen', marginBottom: '20px' }}>{statusMsg}</p>}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1, background: '#32323b', padding: '20px', borderRadius: '10px' }}>
            <h3>{projectForm.id ? 'Edit Project' : 'Add Project'}</h3>
            <form onSubmit={handleProjectSubmit}>
              <label>Project Number</label>
              <input type="number" value={projectForm.w_no} onChange={e => setProjectForm({...projectForm, w_no: e.target.value})} style={inputStyle} required />
              
              <label>Name</label>
              <input type="text" value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} style={inputStyle} required />
              
              <label>Image URL</label>
              <input type="text" value={projectForm.imageUrl} onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})} style={inputStyle} required />
              
              <label>Link</label>
              <input type="text" value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} style={inputStyle} required />
              
              <button type="submit" style={btnStyle}>Save Project</button>
              {projectForm.id && <button type="button" onClick={() => setProjectForm({id: null, w_no: '', name: '', imageUrl: '/projects/', link: ''})} style={{...btnStyle, background: '#555', marginLeft: '10px'}}>Cancel Edit</button>}
            </form>
          </div>
          
          <div style={{ flex: 1 }}>
            <h3>Existing Projects</h3>
            {projects.map(p => (
              <div key={p.id} style={{ background: '#32323b', padding: '10px', marginBottom: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{p.w_no}. {p.name}</span>
                <div>
                  <button onClick={() => setProjectForm(p)} style={{ background: 'transparent', border: 'none', color: '#B415FF', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleProjectDelete(p.id)} style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SKILLS TAB */}
      {activeTab === 'skills' && (
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1, background: '#32323b', padding: '20px', borderRadius: '10px' }}>
            <h3>{skillForm.id ? 'Edit Skill' : 'Add Skill'}</h3>
            <form onSubmit={handleSkillSubmit}>
              <label>Skill Name</label>
              <input type="text" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} style={inputStyle} required />
              
              <label>Value (0-100)</label>
              <input type="number" value={skillForm.value} onChange={e => setSkillForm({...skillForm, value: e.target.value})} style={inputStyle} required min="0" max="100" />
              
              <button type="submit" style={btnStyle}>Save Skill</button>
              {skillForm.id && <button type="button" onClick={() => setSkillForm({id: null, name: '', value: ''})} style={{...btnStyle, background: '#555', marginLeft: '10px'}}>Cancel Edit</button>}
            </form>
          </div>
          
          <div style={{ flex: 1 }}>
            <h3>Existing Skills</h3>
            {skills.map(s => (
              <div key={s.id} style={{ background: '#32323b', padding: '10px', marginBottom: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{s.name} ({s.value}%)</span>
                <div>
                  <button onClick={() => setSkillForm(s)} style={{ background: 'transparent', border: 'none', color: '#B415FF', cursor: 'pointer', marginRight: '10px' }}>Edit</button>
                  <button onClick={() => handleSkillDelete(s.id)} style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <div style={{ background: '#32323b', padding: '20px', borderRadius: '10px' }}>
          <h3>Edit Profile / Homepage Info</h3>
          <form onSubmit={handleProfileSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label>Name</label>
              <input type="text" value={profileForm.name || ''} onChange={e => setProfileForm({...profileForm, name: e.target.value})} style={inputStyle} required />
              
              <label>Hero Title</label>
              <input type="text" value={profileForm.heroTitle || ''} onChange={e => setProfileForm({...profileForm, heroTitle: e.target.value})} style={inputStyle} required />
              
              <label>Hero Description</label>
              <textarea value={profileForm.heroDescription || ''} onChange={e => setProfileForm({...profileForm, heroDescription: e.target.value})} style={{...inputStyle, height: '100px'}} required />
              
              <label>About Paragraph 1</label>
              <textarea value={profileForm.aboutPara1 || ''} onChange={e => setProfileForm({...profileForm, aboutPara1: e.target.value})} style={{...inputStyle, height: '100px'}} required />
              
              <label>About Paragraph 2</label>
              <textarea value={profileForm.aboutPara2 || ''} onChange={e => setProfileForm({...profileForm, aboutPara2: e.target.value})} style={{...inputStyle, height: '100px'}} required />
            </div>
            
            <div>
              <label>Years of Experience</label>
              <input type="text" value={profileForm.experienceYears || ''} onChange={e => setProfileForm({...profileForm, experienceYears: e.target.value})} style={inputStyle} required />
              
              <label>Projects Completed</label>
              <input type="text" value={profileForm.projectsCompleted || ''} onChange={e => setProfileForm({...profileForm, projectsCompleted: e.target.value})} style={inputStyle} required />
              
              <label>Happy Clients</label>
              <input type="text" value={profileForm.happyClients || ''} onChange={e => setProfileForm({...profileForm, happyClients: e.target.value})} style={inputStyle} required />
              
              <label>GitHub URL</label>
              <input type="text" value={profileForm.githubUrl || ''} onChange={e => setProfileForm({...profileForm, githubUrl: e.target.value})} style={inputStyle} required />
              
              <label>LinkedIn URL</label>
              <input type="text" value={profileForm.linkedinUrl || ''} onChange={e => setProfileForm({...profileForm, linkedinUrl: e.target.value})} style={inputStyle} required />
              
              <label>LeetCode URL</label>
              <input type="text" value={profileForm.leetcodeUrl || ''} onChange={e => setProfileForm({...profileForm, leetcodeUrl: e.target.value})} style={inputStyle} required />
              
              <label>Resume URL</label>
              <input type="text" value={profileForm.resumeUrl || ''} onChange={e => setProfileForm({...profileForm, resumeUrl: e.target.value})} style={inputStyle} required />
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <button type="submit" style={btnStyle}>Save Profile Info</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
