import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import QRCard from '../components/QRCard';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, UserCircleIcon, ShieldCheckIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '', type: 'pet', age: '', medicalDetails: '', emergencyContactName: '', emergencyContactPhone: '', hidePhone: true
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/profile');
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/profile', formData);
      setShowForm(false);
      fetchProfiles();
      setFormData({ name: '', type: 'pet', age: '', medicalDetails: '', emergencyContactName: '', emergencyContactPhone: '', hidePhone: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      try {
        await api.delete(`/profile/${id}`);
        fetchProfiles();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container" 
      style={{ padding: '60px 20px', maxWidth: '1200px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="title" style={{ fontSize: '3rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <ShieldCheckIcon style={{ width: '40px', height: '40px', color: 'var(--primary)' }} />
            Welcome, {user?.name.split(' ')[0]}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}
          >
            Manage your GuardianQR tags, update emergency instructions, and configure privacy settings below.
          </motion.p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={showForm ? "btn-secondary" : "btn-primary"} 
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '1.1rem' }}
        >
          {showForm ? 'Cancel Creation' : <><PlusIcon style={{ width: '20px' }} /> New Profile</>}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '40px' }}
          >
            <div className="glass-card" style={{ borderTop: '4px solid var(--primary)', padding: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <UserCircleIcon style={{ width: '32px', color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Create New Profile</h2>
              </div>
              <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div className="form-group">
                  <label>Profile Name (e.g., Bella, Tommy)</label>
                  <input type="text" name="name" value={formData.name} onChange={onChange} required placeholder="Enter name..." />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="type" value={formData.type} onChange={onChange}>
                    <option value="pet">Pet</option>
                    <option value="child">Child</option>
                    <option value="elderly">Elderly / Medical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Age (Optional)</label>
                  <input type="number" name="age" value={formData.age} onChange={onChange} placeholder="Years old" />
                </div>
                <div className="form-group">
                  <label>Emergency Contact Name</label>
                  <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={onChange} required placeholder="Who to contact?" />
                </div>
                <div className="form-group">
                  <label>Emergency Contact Phone (Gets SMS Alerts)</label>
                  <input type="text" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={onChange} required placeholder="+1234567890" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Important Medical Details / Needs</label>
                  <textarea name="medicalDetails" value={formData.medicalDetails} onChange={onChange} rows="4" placeholder="Allergies, chronic conditions, required medications..."></textarea>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                  <input type="checkbox" name="hidePhone" id="hidePhone" checked={formData.hidePhone} onChange={onChange} style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
                  <div>
                    <label htmlFor="hidePhone" style={{ fontSize: '1.1rem', color: '#fff', cursor: 'pointer', display: 'block', marginBottom: '4px' }}>Enable Privacy Protection</label>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Hides your direct phone number visually from strangers. They can still contact you via a secure 'Call Owner' action link.</p>
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}>
                    Generate Secure QR Profile
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <AdjustmentsHorizontalIcon style={{ width: '24px', color: 'var(--text-muted)' }} />
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>Active Profiles</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
        {isLoading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading your profiles...</p>
        ) : profiles.length === 0 ? (
          !showForm && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.02)', border: '2px dashed var(--border-color)', borderRadius: '24px' }}>
              <ShieldCheckIcon style={{ width: '64px', margin: '0 auto 20px', color: 'var(--text-muted)', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No profiles found</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>You haven't created any GuardianQR profiles yet. Create one to protect your loved ones with a scannable emergency tag.</p>
              <button className="btn-primary" onClick={() => setShowForm(true)}>+ Create First Profile</button>
            </motion.div>
          )
        ) : (
          profiles.map((profile, index) => (
            <motion.div 
              key={profile._id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card" 
              style={{ display: 'flex', gap: '24px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--primary), var(--secondary))' }}></div>
              <QRCard profileId={profile._id} name={profile.name} type={profile.type} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</h3>
                  <span style={{ 
                    display: 'inline-block', padding: '4px 10px', borderRadius: '20px', 
                    background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', 
                    fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px',
                    marginBottom: '16px'
                  }}>
                    {profile.type}
                  </span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '8px' }}>
                    <strong style={{ color: '#fff' }}>Contact:</strong><br/>{profile.emergencyContactName}
                  </p>
                </div>
                <button onClick={() => handleDelete(profile._id)} className="btn-danger" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <TrashIcon style={{ width: '16px' }} /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;