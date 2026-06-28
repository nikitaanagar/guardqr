import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Lock } from 'lucide-react';

const QRCard = ({ profileId, name, type, paid, onUnlock }) => {
  const qrUrl = `${window.location.origin}/profile/${profileId}`;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      background: '#fff', 
      padding: '16px', 
      borderRadius: '8px', 
      color: '#000',
      border: '1px solid var(--border-color)',
      position: 'relative',
      width: '180px'
    }}>
      {!paid ? (
        <div style={{ 
          width: '150px', 
          height: '150px', 
          background: '#f4f4f5', 
          borderRadius: '4px',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px',
          marginBottom: '16px',
          border: '1px dashed #cbd5e1'
        }}>
          <Lock size={28} color="#71717a" />
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#71717a' }}>QR Locked</span>
          <button 
            onClick={onUnlock}
            style={{ 
              padding: '4px 8px', 
              fontSize: '0.7rem', 
              background: 'var(--accent)', 
              color: '#fff', 
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            Pay $5.00
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '16px' }}>
          <QRCodeSVG value={qrUrl} size={150} level="H" includeMargin={true} />
        </div>
      )}

      <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '2px', textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</h3>
      <p style={{ color: '#71717a', textTransform: 'capitalize', fontSize: '0.8rem', marginBottom: '12px' }}>{type} safety</p>
      
      {paid ? (
        <a 
          href={qrUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            width: '100%',
            textAlign: 'center',
            padding: '6px 10px', 
            background: 'var(--primary)', 
            color: '#fff', 
            borderRadius: '4px', 
            fontSize: '0.8rem', 
            fontWeight: '600' 
          }}
        >
          Preview Tag
        </a>
      ) : (
        <button 
          onClick={onUnlock}
          style={{ 
            width: '100%',
            textAlign: 'center',
            padding: '6px 10px', 
            background: '#e4e4e7', 
            color: '#18181b', 
            borderRadius: '4px', 
            fontSize: '0.8rem', 
            fontWeight: '600' 
          }}
        >
          Unlock QR
        </button>
      )}
    </div>
  );
};

export default QRCard;
