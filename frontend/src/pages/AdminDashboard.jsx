import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, CreditCard, Scan, FileText, Trash2, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalProfiles: 0, paidProfiles: 0, totalScans: 0 });
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [scans, setScans] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data);

      const usersRes = await api.get('/admin/users');
      setUsers(usersRes.data);

      const profilesRes = await api.get('/admin/profiles');
      setProfiles(profilesRes.data);

      const scansRes = await api.get('/admin/scans');
      setScans(scansRes.data);
    } catch (err) {
      console.error('Failed to fetch admin dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePayment = async (profileId) => {
    try {
      await api.put(`/admin/profiles/${profileId}/payment`);
      fetchAdminData();
    } catch (err) {
      console.error(err);
      alert('Failed to update payment status');
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (window.confirm('Delete this profile and all its scan logs?')) {
      try {
        await api.delete(`/admin/profiles/${profileId}`);
        fetchAdminData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Delete this user and all their profiles/scans?')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        fetchAdminData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center', fontSize: '0.95rem' }}>
        Loading admin console...
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <ShieldAlert size={28} color="var(--primary)" />
          Admin Console
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Overview and management of users, profiles, and finder alert activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '6px', color: '#1d4ed8' }}>
            <Users size={20} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Total Users</p>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', background: '#f4f4f5', borderRadius: '6px', color: '#18181b' }}>
            <FileText size={20} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>QR Profiles</p>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>{stats.totalProfiles}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', background: '#ecfdf5', borderRadius: '6px', color: '#047857' }}>
            <CreditCard size={20} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Paid Activations</p>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>{stats.paidProfiles}</h3>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '10px', background: '#fffbeb', borderRadius: '6px', color: '#b45309' }}>
            <Scan size={20} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Total Scan Events</p>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>{stats.totalScans}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '20px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveTab('stats')}
          style={{ 
            padding: '10px 4px', 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            background: 'none',
            color: activeTab === 'stats' ? 'var(--text-main)' : 'var(--text-muted)',
            borderBottom: activeTab === 'stats' ? '2px solid var(--primary)' : '2px solid transparent',
            borderRadius: 0
          }}
        >
          General Stats
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ 
            padding: '10px 4px', 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            background: 'none',
            color: activeTab === 'users' ? 'var(--text-main)' : 'var(--text-muted)',
            borderBottom: activeTab === 'users' ? '2px solid var(--primary)' : '2px solid transparent',
            borderRadius: 0
          }}
        >
          Users ({users.length})
        </button>
        <button 
          onClick={() => setActiveTab('profiles')}
          style={{ 
            padding: '10px 4px', 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            background: 'none',
            color: activeTab === 'profiles' ? 'var(--text-main)' : 'var(--text-muted)',
            borderBottom: activeTab === 'profiles' ? '2px solid var(--primary)' : '2px solid transparent',
            borderRadius: 0
          }}
        >
          Profiles ({profiles.length})
        </button>
        <button 
          onClick={() => setActiveTab('scans')}
          style={{ 
            padding: '10px 4px', 
            fontSize: '0.9rem', 
            fontWeight: '600', 
            background: 'none',
            color: activeTab === 'scans' ? 'var(--text-main)' : 'var(--text-muted)',
            borderBottom: activeTab === 'scans' ? '2px solid var(--primary)' : '2px solid transparent',
            borderRadius: 0
          }}
        >
          Scan Activity Logs ({scans.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'stats' && (
          <div className="glass-card animate-fade-in" style={{ padding: '24px', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px' }}>Platform Activity Overview</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Welcome to the GuardianQR admin console. Here you can monitor system parameters, inspect active QR registrations, manage registered safety profiles, and review finder interaction logs.
            </p>
            <div style={{ marginTop: '20px', padding: '16px', background: '#f4f4f5', borderRadius: '6px', fontSize: '0.85rem', border: '1px solid var(--border-color)' }}>
              <strong>Admin Testing Tip:</strong> Register any email starting with the word "admin" (e.g. <code>admin@guardianqr.com</code>) to test admin dashboard routing and overrides.
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="glass-card animate-fade-in" style={{ padding: '16px', borderRadius: '6px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 8px' }}>Name</th>
                  <th style={{ padding: '12px 8px' }}>Email</th>
                  <th style={{ padding: '12px 8px' }}>Role</th>
                  <th style={{ padding: '12px 8px' }}>Joined Date</th>
                  <th style={{ padding: '12px 8px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid #f4f4f5' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '600' }}>{u.name}</td>
                    <td style={{ padding: '12px 8px' }}>{u.email}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span className={u.role === 'admin' ? "badge badge-blue" : "badge badge-gray"}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px 8px' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDeleteUser(u._id)}
                        style={{ background: 'none', color: 'var(--danger)', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'profiles' && (
          <div className="glass-card animate-fade-in" style={{ padding: '16px', borderRadius: '6px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 8px' }}>Profile Name</th>
                  <th style={{ padding: '12px 8px' }}>Type</th>
                  <th style={{ padding: '12px 8px' }}>Owner</th>
                  <th style={{ padding: '12px 8px' }}>Payment Status</th>
                  <th style={{ padding: '12px 8px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid #f4f4f5' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '600' }}>{p.name}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span className="badge badge-gray">{p.type}</span>
                    </td>
                    <td style={{ padding: '12px 8px' }}>{p.user?.name || 'Deleted'} ({p.user?.email || 'N/A'})</td>
                    <td style={{ padding: '12px 8px' }}>
                      <button 
                        onClick={() => handleTogglePayment(p._id)}
                        className={p.paid ? "badge badge-green" : "badge badge-yellow"}
                        style={{ border: 'none', cursor: 'pointer' }}
                        title="Click to toggle status"
                      >
                        {p.paid ? 'Paid / Active' : 'Unpaid / Locked'}
                      </button>
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDeleteProfile(p._id)}
                        style={{ background: 'none', color: 'var(--danger)', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'scans' && (
          <div className="glass-card animate-fade-in" style={{ padding: '16px', borderRadius: '6px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 8px' }}>Scanned Profile</th>
                  <th style={{ padding: '12px 8px' }}>Owner</th>
                  <th style={{ padding: '12px 8px' }}>Location / IP</th>
                  <th style={{ padding: '12px 8px' }}>Finder Alert Message</th>
                  <th style={{ padding: '12px 8px' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((s) => (
                  <tr key={s._id} style={{ borderBottom: '1px solid #f4f4f5' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '600' }}>
                      {s.profile?.name || 'Deleted'} ({s.profile?.type || 'Unknown'})
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      {s.profile?.user?.name || 'Deleted'} ({s.profile?.user?.email || 'N/A'})
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ fontWeight: '500' }}>{s.approximateLocation}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>IP: {s.ip}</div>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      {s.message ? (
                        <div style={{ 
                          padding: '6px 10px', 
                          background: '#fffbeb', 
                          border: '1px solid #fde68a', 
                          borderRadius: '4px',
                          color: '#b45309',
                          fontWeight: '600',
                          fontSize: '0.8rem'
                        }}>
                          "{s.message}"
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Auto location scan on load</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
