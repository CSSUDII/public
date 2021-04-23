// WE-BT16 API

const express = require('express');
const yaml = require('js-yaml');

// Load Config
try {
  this.config = yaml.load(fs.readFileSync('config.yml', 'utf8'));
} catch (e) {
  console.log('Error loading config.yml' + e);
}

const server = express();

server.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

server.listen(8080, () =>
  console.log(`Example app listening on port 8080!`),
);
