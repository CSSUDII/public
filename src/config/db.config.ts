require('dotenv').config({
    path: "@env/.env" // Path to .env
});

const url: string | undefined = process.env.DB_URL;
const token: string | undefined = process.env.TOKEN;

export default { url, token };