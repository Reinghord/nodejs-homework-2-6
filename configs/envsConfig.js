require("dotenv").config();

const { DB_HOST, PORT, SECRET_KEY } = process.env;

module.exports = { DB_HOST, PORT, SECRET_KEY };
