import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
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
      setError('Google Sign-in failed');
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
          document.getElementById("google-signin-btn"),
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
            Welcome back
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Enter your credentials to access your account
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
            Sign In
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '12px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OR CONTINUE WITH</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
        </div>

        {/* Real Official Google Sign-In Button */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '40px' }}>
          <div id="google-signin-btn"></div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;