const net = require('net');

const { getLocationInfos } = require('./location');

const getHeaderValue = (data, header) => {
  const headerData = data
    .split('\r\n')
    .find((chunk) => chunk.startsWith(header));

  return headerData.split(': ').pop();
};

const startOfResponse = 'HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n';

const endOfResponse = '\r\n\r\n';

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const clientIP = getHeaderValue(data.toString(), 'X-Forwarded-For');
    const dispositivo = getHeaderValue(data.toString(), 'User-Agent');

    getLocationInfos(clientIP, (locationData) => {
      socket.write(startOfResponse);
      socket.write('<html><head><meta http-equiv="content-type" content="text/html;charset=utf-8">');
      socket.write('<title>Trybe 🚀</title></head><body>');
      socket.write('<H1>Explorando os Protocolos 🧐🔎</H1>');
      socket.write(`<p> IP: ${clientIP}</p>`);
      socket.write(`<p> Dispositivo: ${dispositivo}</p>`);
      socket.write(`<p> Cidade: ${locationData.city}</p>`);
      socket.write(`<p> Código Postal: ${locationData.postal_code}</p>`);
      socket.write(`<p> Região: ${locationData.region}</p>`);
      socket.write(`<p> País: ${locationData.country_name}</p>`);
      socket.write(`<p> Companhia: ${locationData.company}</p>`);
      socket.write('<iframe src="https://giphy.com/embed/l3q2zVr6cu95nF6O4" width="480" height="236" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
      socket.write('</body></html>');
      socket.write(endOfResponse);
    });
  });
});

console.log('Server TCP ativo!');

server.listen(8080);
