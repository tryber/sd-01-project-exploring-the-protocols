const https = require('https');

const options = {
  hostname: 'iplocation.com',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

module.exports = (clientIP, cb) => {
  const req = https.request(options, (res) => {
    res.on('data', (locationDataRaw) => {
      const locationData = locationDataRaw.toString();
      cb(locationData);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(`ip=${clientIP}`);

  req.end();
};
