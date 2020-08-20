const net = require('net');

const getLocationInfos = require('./location');

const getHeaderValue = (data, header) => {
  const headerData = data
    .split('\r\n')
    .find((chunk) => chunk.startsWith(header));

  return headerData.split(': ').pop();
};

const startOfResponse =
  'HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n';

const endOfResponse = '\r\n\r\n';

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const clientIP = getHeaderValue(data.toString(), 'X-Forwarded-For');

    getLocationInfos(clientIP, (locationData) => {
      const { city, postal_code, region, region, country_name } = locationData;
      socket.write(startOfResponse);
      socket.write(
        '<html><head><meta http-equiv="content-type" content="text/html;charset=utf-8">'
      );
      socket.write('<title>Trybe 🚀</title></head><body>');
      socket.write('<H1>Explorando os Protocolos 🧐🔎</H1>');
      socket.write(
        `<span> 
            <p>IP: ${clientIP}</p> 
            <p>Localização: ${city}</p> 
            <p>zipcode: ${postal_code} - ${region} / ${country_name}<p/> 
        </span>`
      );
      socket.write(
        '<iframe src="https://giphy.com/embed/l3q2zVr6cu95nF6O4" width="480" height="236" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'
      );
      socket.write('</body></html>');
      socket.write(endOfResponse);
    });
  });
});

console.log('Server TCP ativo!');

server.listen(8080);
