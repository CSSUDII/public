// WE-BT16 API

const express = require('express');
const yaml = require('js-yaml');
const logDoc = require('inklog.js');

this.logger = logDoc;

// Load Config
try {
  this.config = yaml.load(fs.readFileSync('config.yml', 'utf8'));
  this.logger.info('Loaded Config File')
} catch (e) {
  new Error('Error loading config.yml' + e);
}

this.port = this.config.port;

const server = express();

server.get('/', (req, res) => {
  if (this.debug) { this.logger.debug('POST Request Received') }
  return res.send('Received a GET HTTP method');
});

server.listen(this.port, () =>
  this.logger.info(`API Live on: ${this.port}`),
);
