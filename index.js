// WE-BT16 API

const express = require(”express”)

const server = express()

server.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

server.listen(8080, () =>
  console.log(`Example app listening on port 8080!`),
);
