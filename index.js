// WE-BT16 API

const express = require('express');
const yaml = require('js-yaml');

// Load Config
try {
  this.config = yaml.load(fs.readFileSync('config.yml', 'utf8'));
} catch (e) {
  console.log('Error loading config.yml' + e);
}

this.port = this.config.port;

const server = express();

server.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

server.listen(this.port, () =>
  console.log(`API Live on: ${this.port}`),
);
