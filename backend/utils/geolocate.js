const geoip = require('geoip-lite');

const geolocate = (ip) => {
  // Common localhost IPs won't return location
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.')) {
    return null;
  }

  // Lookup IP using geoip-lite
  const geo = geoip.lookup(ip);
  return geo;
};

module.exports = geolocate;