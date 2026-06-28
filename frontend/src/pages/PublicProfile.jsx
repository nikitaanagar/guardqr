import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { PhoneIcon, ExclamationTriangleIcon, UserIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { Mail, Send, AlertTriangle } from 'lucide-react';

const PublicProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationGranted, setLocationGranted] = useState(false);
  const [locationFetching, setLocationFetching] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Message Form States
  const [messageText, setMessageText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/profile/public/${id}`);
      setProfile(res.data);
      // Only request location and log standard scan alert if the profile is paid
      if (res.data.paid !== false) {
        requestLocationAndLogScan();
      } else {
        setLoading(false);
      }
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
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          await logScan(position.coords.latitude, position.coords.longitude);
        },
        async (error) => {
          console.warn('Geolocation denied. Using IP fallback.', error);
          setLocationFetching(false);
          await logScan(null, null);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationFetching(false);
      logScan(null, null);
    }
  };

  const logScan = async (lat, lng) => {
    try {
      await api.post(`/scan/${id}`, { latitude: lat, longitude: lng });
    } catch (err) {
      console.error('Failed to log scan', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setIsSendingMessage(true);
    try {
      await api.post(`/scan/${id}/message`, {
        message: messageText,
        latitude,
        longitude
      });
      setMessageSuccess(true);
      setMessageText('');
    } catch (err) {
      console.error(err);
      alert('Failed to send alert message to the parent.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (loading) return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>
        <ShieldCheckIcon style={{ width: '48px', color: 'var(--primary)' }} />
      </motion.div>
      <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Acquiring Safety Profile...</p>
    </div>
  );

  if (error) return (
    <div className="container" style={{ textAlign: 'center', marginTop: '15vh' }}>
      <ExclamationTriangleIcon style={{ width: '60px', color: 'var(--danger)', margin: '0 auto 16px' }} />
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>Not Found</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{error}</p>
      <Link to="/" className="btn-primary" style={{ marginTop: '24px' }}>Go to Homepage</Link>
    </div>
  );

  // Locked State for Unpaid Profiles
  if (profile && profile.paid === false) {
    return (
      <div className="container animate-fade-in" style={{ padding: '40px 20px', maxWidth: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px 24px', borderTop: '4px solid var(--danger)' }}>
          <AlertTriangle size={48} color="var(--danger)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>Inactive QR Code</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
            This safety profile for <strong>"{profile.name}"</strong> is currently pending activation by the owner. Please try scanning again once payment is completed.
          </p>
          <Link to="/" className="btn-secondary" style={{ width: '100%' }}>Go to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '20px', maxWidth: '500px', minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="glass-card" style={{ borderTop: `4px solid var(--danger)`, padding: '30px 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: locationGranted ? '#ecfdf5' : '#f4f4f5', padding: '6px 12px', borderRadius: '4px', border: `1px solid ${locationGranted ? '#a7f3d0' : 'var(--border-color)'}` }}>
            <MapPinIcon style={{ width: '14px', color: locationGranted ? 'var(--success)' : 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.8rem', color: locationGranted ? '#047857' : 'var(--text-muted)', fontWeight: 500 }}>
              {locationFetching ? 'Acquiring GPS...' : (locationGranted ? 'GPS Location Shared with Parent' : 'Approximate Location Logged')}
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginTop: '16px', letterSpacing: '-0.02em' }}>Emergency Profile</h1>
        </div>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '6px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '4px' }}>
              <UserIcon style={{ width: '24px', color: '#fff' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>{profile.name}</h2>
              <span className="badge badge-gray" style={{ marginTop: '4px' }}>
                {profile.type} {profile.age && `• ${profile.age} Y/O`}
              </span>
            </div>
          </div>

          {profile.medicalDetails && (
            <div style={{ padding: '12px 16px', background: '#fff5f5', border: '1px solid #fee2e2', borderRadius: '4px', marginTop: '16px' }}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: '700', marginBottom: '4px', letterSpacing: '0.05em' }}>MEDICAL INFORMATION</h3>
              <p style={{ fontSize: '0.9rem', color: '#000', lineHeight: '1.4' }}>{profile.medicalDetails}</p>
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginBottom: '24px' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600', marginBottom: '4px' }}>Emergency Contact Name</p>
          <p style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: '#000' }}>{profile.emergencyContactName}</p>
          
          <a 
            href={`tel:${profile.emergencyContactPhone}`} 
            className="btn-primary" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              width: '100%', 
              padding: '12px', 
              fontSize: '1rem', 
              borderRadius: '6px', 
              background: '#10b981'
            }}
          >
            <PhoneIcon style={{ width: '18px' }} /> 
            {profile.hidePhone ? 'Call Owner (Secure Link)' : profile.emergencyContactPhone}
          </a>
        </div>

        {/* Custom Message Notification Form */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={16} /> Send Alert Message to Parent
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '12px' }}>
            Send a custom text message (e.g. "Your child is safe with me at Jaipur railway station") directly to the parent's email and mobile.
          </p>

          {messageSuccess ? (
            <div style={{ 
              padding: '12px', 
              borderRadius: '4px', 
              background: '#ecfdf5', 
              border: '1px solid #a7f3d0', 
              color: '#047857',
              fontSize: '0.85rem',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              Alert message has been sent successfully to the parent!
            </div>
          ) : (
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required
                placeholder='Type your message here (e.g. "Apka bacha jaipur mai hai")'
                rows="3"
                style={{ fontSize: '0.85rem', resize: 'none' }}
              />
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ 
                  height: '38px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px'
                }}
                disabled={isSendingMessage}
              >
                {isSendingMessage ? 'Sending Alert...' : <><Send size={14} /> Send Alert Message</>}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default PublicProfile;