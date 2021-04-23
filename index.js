// WE-BT16 API

const express = require('express');
const yaml = require('js-yaml');
const logDoc = require('inklog.js');

this.logger = logDoc;

// Load Config
async loadConfig() => {
try {
 await this.config = yaml.load(fs.readFileSync('config.yml', 'utf8'));
  this.logger.info('Loaded Config File')
} catch (e) {
  this.logger.error('Error loading Config, Using Defaults' + e)
};
}

loadConfig();

this.port = this.config.port;
this.debug = this.config.debug;

async checks() => {
  this.logger.debug('Running Checks');
  if (!this.port) this.port = this.default.port;
  if (!this.debug) this.debug = false;
};

const server = express();

server.get('/', (req, res) => {
  if (this.debug) { this.logger.debug('POST Request Received') }
  return res.send('Received a GET HTTP method');
});

server.listen(this.port, () => {
  this.logger.info(`API Live on: ${this.port}`),
});
