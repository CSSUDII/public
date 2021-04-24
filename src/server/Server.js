import express from "express";

const server = express();

server.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

export default server;