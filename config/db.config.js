require('dotenv').config({
    path: "./.env" // Path to .env
});

module.exports = {
    url: process.env.DB_URL,
    token: process.env.TOKEN
};