require("dotenv").config();

const { DB_HOST, PORT, SECRET_KEY, META_PASSWORD, META_EMAIL } = process.env;

module.exports = { DB_HOST, PORT, SECRET_KEY, META_PASSWORD, META_EMAIL };
