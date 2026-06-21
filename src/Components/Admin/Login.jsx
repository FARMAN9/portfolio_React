import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#161513', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={{ background: '#32323b', padding: '40px', borderRadius: '10px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#161513', color: 'white' }}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#161513', color: 'white' }}
            required
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#B415FF', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ color: '#aaa', textDecoration: 'none' }}>&larr; Back to Portfolio</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
