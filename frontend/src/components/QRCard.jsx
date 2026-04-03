import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCard = ({ profileId, name, type }) => {
  const qrUrl = `${window.location.origin}/profile/${profileId}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', padding: '16px', borderRadius: '12px', color: '#000' }}>
      <div style={{ marginBottom: '16px' }}>
        <QRCodeSVG value={qrUrl} size={150} level="H" includeMargin={true} />
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px' }}>{name}</h3>
      <p style={{ color: '#666', textTransform: 'capitalize', fontSize: '0.9rem', marginBottom: '16px' }}>{type} Safety Tag</p>
      <a href={qrUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', background: 'var(--primary)', color: '#fff', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '600' }}>
        Preview Public Profile
      </a>
    </div>
  );
};

export default QRCard;
