import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, LogOut, LayoutDashboard, Search, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (location.pathname === '/' || location.pathname.startsWith('/profile/')) {
    return null;
  }

  return (
    <nav style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
          <ShieldCheck size={32} color="var(--accent)" />
          <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em' }}>GuardianQR</span>
        </Link>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: 'var(--accent)' }}>
                  <ShieldAlert size={20} /> Admin
                </Link>
              )}
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link to="/scan-alerts" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                <Search size={20} /> Alerts
              </Link>
              <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', height: '36px' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary" style={{ padding: '8px 16px' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '8px 16px' }}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
