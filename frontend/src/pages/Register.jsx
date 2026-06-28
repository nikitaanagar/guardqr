import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      if (email.toLowerCase() === 'nikitanagar.1201@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleGoogleCredentialResponse = async (response) => {
    try {
      // Decode JWT token client-side
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decoded = JSON.parse(jsonPayload);
      
      // Call backend Google Auth endpoint with raw token
      await loginWithGoogle(response.credential);
      
      if (decoded.email.toLowerCase() === 'nikitanagar.1201@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Google Sign-up failed');
    }
  };

  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "109876543210-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com";
    
    const initGoogleBtn = () => {
      if (window.google) {
        /* global google */
        google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("google-signup-btn"),
          { theme: "outline", size: "large", width: "328" }
        );
      }
    };

    // Retry initialization if google script is still loading asynchronously
    if (window.google) {
      initGoogleBtn();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initGoogleBtn();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="auth-container animate-fade-in">
      <div className="glass-card auth-form" style={{ borderRadius: '6px', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            Create an account
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Enter your details to create your dashboard
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: '10px', 
            fontSize: '0.85rem', 
            borderRadius: '4px', 
            backgroundColor: '#fff5f5', 
            border: '1px solid #fee2e2', 
            color: 'var(--danger)', 
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="name@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ height: '42px', marginTop: '4px' }}>
            Create Account
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OR CONTINUE WITH</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
        </div>

        {/* Real Official Google Sign-In Button */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '40px' }}>
          <div id="google-signup-btn"></div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;