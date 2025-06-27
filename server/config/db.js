const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'myapp'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected');
});

module.exports = connection;