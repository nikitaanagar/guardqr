import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import QRCard from '../components/QRCard';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon, UserCircleIcon, ShieldCheckIcon, AdjustmentsHorizontalIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { ShieldAlert } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '', type: 'pet', age: '', medicalDetails: '', emergencyContactName: '', emergencyContactPhone: '', hidePhone: true
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Payment Modal States
  const [payingProfile, setPayingProfile] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

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

  const handlePayActivation = async (e) => {
    e.preventDefault();
    if (!payingProfile) return;
    setPaymentLoading(true);
    // Simulate short network delay
    setTimeout(async () => {
      try {
        await api.put(`/profile/${payingProfile._id}/pay`);
        setPayingProfile(null);
        setCardNumber('');
        setCardExpiry('');
        setCardCvc('');
        fetchProfiles();
      } catch (err) {
        console.error(err);
        alert('Payment activation failed. Please try again.');
      } finally {
        setPaymentLoading(false);
      }
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="container" 
      style={{ padding: '40px 20px', maxWidth: '1000px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            Welcome, {user?.name.split(' ')[0]}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage your QR safety tags and configure emergency information.
          </p>
        </div>
        <button 
          className={showForm ? "btn-secondary" : "btn-primary"} 
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '38px', padding: '0 16px', fontSize: '0.85rem' }}
        >
          {showForm ? 'Cancel' : <><PlusIcon style={{ width: '16px' }} /> Create Profile</>}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2 }}
            style={{ marginBottom: '32px' }}
          >
            <div className="glass-card" style={{ padding: '24px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <UserCircleIcon style={{ width: '22px', color: 'var(--primary)' }} />
                <h2 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>New Profile</h2>
              </div>
              <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
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
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Emergency Contact Phone (Gets SMS Alerts)</label>
                  <input type="text" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={onChange} required placeholder="+919876543210" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Important Medical Details / Needs</label>
                  <textarea name="medicalDetails" value={formData.medicalDetails} onChange={onChange} rows="3" placeholder="Allergies, chronic conditions, required medications..."></textarea>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1', background: '#f4f4f5', padding: '16px', borderRadius: '6px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
                  <input type="checkbox" name="hidePhone" id="hidePhone" checked={formData.hidePhone} onChange={onChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                  <div>
                    <label htmlFor="hidePhone" style={{ fontSize: '0.9rem', color: '#000', cursor: 'pointer', display: 'block', fontWeight: '600' }}>Enable Privacy Protection</label>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Hides your phone number from strangers. They can still call you via a secure relay link.</p>
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1', marginTop: '4px' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%', height: '42px' }}>
                    Generate Profile (Requires Payment)
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <AdjustmentsHorizontalIcon style={{ width: '18px', color: 'var(--text-muted)' }} />
        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', margin: 0 }}>Active Profiles</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {isLoading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading profiles...</p>
        ) : profiles.length === 0 ? (
          !showForm && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', border: '1px dashed var(--border-color)', borderRadius: '6px' }}>
              <ShieldAlert style={{ width: '32px', height: '32px', margin: '0 auto 12px', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>No profiles yet</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>Generate a QR code profile to protect your kids, pets, or elderly.</p>
              <button className="btn-primary" onClick={() => setShowForm(true)} style={{ height: '34px', padding: '0 12px', fontSize: '0.8rem' }}>+ Add First Profile</button>
            </div>
          )
        ) : (
          profiles.map((profile) => (
            <div 
              key={profile._id} 
              className="glass-card" 
              style={{ display: 'flex', gap: '16px', position: 'relative', borderRadius: '6px' }}
            >
              <QRCard 
                profileId={profile._id} 
                name={profile.name} 
                type={profile.type} 
                paid={profile.paid}
                onUnlock={() => setPayingProfile(profile)}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</h3>
                    <span className={profile.paid ? "badge badge-green" : "badge badge-yellow"}>
                      {profile.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                  <span className="badge badge-gray" style={{ marginBottom: '12px' }}>
                    {profile.type}
                  </span>
                  
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <strong>Contact Name:</strong> {profile.emergencyContactName}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <strong>Phone:</strong> {profile.emergencyContactPhone}
                  </p>
                  {profile.medicalDetails && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <strong>Medical:</strong> {profile.medicalDetails}
                    </p>
                  )}
                </div>
                
                <button 
                  onClick={() => handleDelete(profile._id)} 
                  className="btn-danger" 
                  style={{ alignSelf: 'flex-start', padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <TrashIcon style={{ width: '14px' }} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stripe Payment Mock Modal */}
      {payingProfile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '90%', maxWidth: '400px', padding: '24px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <CreditCardIcon style={{ width: '24px', color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>Activate QR Code</h3>
            </div>
            
            <div style={{ background: '#f4f4f5', padding: '12px', borderRadius: '6px', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: '500' }}>Order Summary</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>1x QR Registration ({payingProfile.name})</span>
                <span>$5.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                <span>Total Amount</span>
                <span>$5.00</span>
              </div>
            </div>

            <form onSubmit={handlePayActivation} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  required 
                  placeholder="4242 •••• •••• 4242" 
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Expiry (MM/YY)</label>
                  <input 
                    type="text" 
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                    required 
                    placeholder="12/28" 
                  />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input 
                    type="password" 
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    required 
                    placeholder="•••" 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => setPayingProfile(null)}
                  className="btn-secondary" 
                  style={{ flex: 1, height: '40px' }}
                  disabled={paymentLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ flex: 1, height: '40px' }}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? 'Processing...' : 'Pay $5.00'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;