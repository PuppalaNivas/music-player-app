import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../CSS files/AuthOverlay.css';

const API_BASE = 'http://localhost:8080/api';

const AuthOverlay = () => {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode') || 'login';
  const [authMode, setAuthMode] = useState(modeParam);
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/users/login`, {
        email: formData.email,
        password: formData.password
      });
      if (res.data && res.data.id) {
        login(res.data);
      } else {
        alert('Invalid credentials');
      }
    } catch {
      alert('Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/users/register`, formData);
      alert('Registration successful! Please log in.');
      setAuthMode('login');
    } catch {
      alert('Registration failed');
    }
  };

  useEffect(() => {
    setAuthMode(modeParam);
  }, [modeParam]);

  return (
    <div className="auth-overlay-container">
      <div className="auth-overlay-card">
        <img src="/Cat.png" alt="Cat showing login" className="cat-image" />
        <h2>{authMode === 'login' ? 'Login Here' : 'Register Here'}</h2>
        <form onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
          {authMode === 'register' && (
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {authMode === 'register' && (
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          )}
          <button type="submit">{authMode === 'login' ? 'Login' : 'Register'}</button>
        </form>
        <p
          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        >
          {authMode === 'login' ? 'Don’t have an account? Register' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default AuthOverlay;
