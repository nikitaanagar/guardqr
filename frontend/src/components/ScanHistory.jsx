import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { MapPin, Clock, Info } from 'lucide-react';

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/scan/history');
      setScans(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>Loading scan data...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      <h1 className="title" style={{ marginBottom: '8px' }}>Scan Activity</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Track when and where your profiles were viewed.</p>

      {scans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No scans recorded yet. Your loved ones are safe!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {scans.map((scan) => (
            <div key={scan._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Info size={18} color="var(--primary)" /> 
                  {scan.profile?.name || 'Deleted Profile'} ({scan.profile?.type || 'Unknown'})
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={16} /> {new Date(scan.createdAt).toLocaleString()}
                </span>
              </div>
              
              <div style={{ background: 'var(--surface-color)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={24} color={scan.latitude ? 'var(--success)' : 'var(--secondary)'} />
                <div>
                  <p style={{ fontWeight: '500', marginBottom: '4px' }}>Detected Location</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{scan.approximateLocation}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>IP: {scan.ip}</p>
                </div>
                {scan.latitude && scan.longitude && (
                  <div style={{ marginLeft: 'auto' }}>
                    <a 
                      href={`https://www.google.com/maps?q=${scan.latitude},${scan.longitude}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    >
                      View Map
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScanHistory;
