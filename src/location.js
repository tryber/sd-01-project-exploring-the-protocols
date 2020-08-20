const https = require('https');

const options = {
  hostname: 'iplocation.com',
  port: 8085,
  path: '/',
  method: 'POST',
  headers: 'Content-Type: application/x-www-form-urlencoded;'
};

module.exports = (clientIP, cb) => {
  console.log('teste')
  const req = https.request(options, (res) => {
    res.on('data', (locationDataRaw) => {
      const locationData = JSON.parse(locationDataRaw.toString());

      console.log('Location data:');
      console.log(locationData);

      cb(locationData);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(`ip=${clientIP}`);

  req.end();
};
