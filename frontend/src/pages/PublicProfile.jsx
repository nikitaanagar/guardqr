import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PhoneIcon, ExclamationTriangleIcon, HeartIcon, UserIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const PublicProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationGranted, setLocationGranted] = useState(false);
  const [locationFetching, setLocationFetching] = useState(true);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/profile/public/${id}`);
      setProfile(res.data);
      // Once profile is fetched, immediately log scan so owner is alerted
      requestLocationAndLogScan();
    } catch (err) {
      setError('Profile not found or is no longer available.');
      setLoading(false);
    }
  };

  const requestLocationAndLogScan = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocationGranted(true);
          setLocationFetching(false);
          await logScan(position.coords.latitude, position.coords.longitude);
        },
        async (error) => {
          console.warn('Geolocation denied or failed. Falling back to IP tracking.', error);
          setLocationFetching(false);
          await logScan(null, null); // Backend handles IP fallback
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationFetching(false);
      logScan(null, null);
    }
  };

  const logScan = async (latitude, longitude) => {
    try {
      await axios.post(`http://localhost:5001/api/scan/${id}`, { latitude, longitude });
    } catch (err) {
      console.error('Failed to log scan', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>
        <ShieldCheckIcon style={{ width: '64px', color: 'var(--primary)' }} />
      </motion.div>
      <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '1.2rem' }}>Acquiring Secure Emergency Profile...</p>
    </div>
  );

  if (error) return (
    <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <ExclamationTriangleIcon style={{ width: '80px', color: 'var(--danger)', margin: '0 auto 20px' }} />
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Not Found</h2>
      <p style={{ color: 'var(--text-muted)' }}>{error}</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '30px' }}>Go to Homepage</Link>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="container" style={{ padding: '20px', maxWidth: '600px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="glass-card" style={{ borderTop: `6px solid var(--danger)`, position: 'relative', overflow: 'hidden', padding: '40px 30px' }}>
        {/* Decorative alert waves behind icon */}
        <motion.div 
          animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--danger)', zIndex: 0 }}
        />

        <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
          <ExclamationTriangleIcon style={{ width: '70px', color: '#fff', margin: '0 auto 20px', filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.8))' }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', fontWeight: '800', letterSpacing: '-1px' }}>Emergency Profile</h1>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: locationGranted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '20px', border: `1px solid ${locationGranted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)'}` }}>
            <MapPinIcon style={{ width: '16px', color: locationGranted ? 'var(--success)' : 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.9rem', color: locationGranted ? 'var(--success)' : 'var(--text-muted)', fontWeight: 500 }}>
              {locationFetching ? 'Acquiring GPS...' : (locationGranted ? 'GPS Location Shared with Owner' : 'Approximate Location Shared')}
            </span>
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', marginBottom: '30px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '12px' }}>
              <UserIcon style={{ width: '32px', color: '#fff' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>{profile.name}</h2>
              <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                {profile.type} {profile.age && `• ${profile.age} Y/O`}
              </p>
            </div>
          </div>

          {profile.medicalDetails && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '24px', padding: '20px', background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <HeartIcon style={{ width: '28px', color: 'var(--danger)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#fca5a5', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.5px' }}>MEDICAL ALERTS / NEEDS</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', color: '#fff' }}>{profile.medicalDetails}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: 'linear-gradient(180deg, rgba(30,41,59,0), rgba(30,41,59,0.8))', margin: '-30px -30px -40px -30px', padding: '40px 30px', borderRadius: '0 0 16px 16px' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>Emergency Contact</p>
          <p style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '24px', color: '#fff' }}>{profile.emergencyContactName}</p>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href={`tel:${profile.emergencyContactPhone}`} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px', textDecoration: 'none', width: '100%', padding: '20px', fontSize: '1.3rem', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)' }}>
              <PhoneIcon style={{ width: '24px' }} /> 
              {profile.hidePhone ? 'Call Owner Immediately' : profile.emergencyContactPhone}
            </a>
          </motion.div>
          
          {profile.hidePhone && (
            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheckIcon style={{ width: '14px' }} /> Privacy protected. Number hidden.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PublicProfile;