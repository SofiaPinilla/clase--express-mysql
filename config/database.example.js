const mysql = require('mysql2');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'tu usuario',
  password : 'tu contraseña',
  database:'nombre de base de datos'
});

db.connect();

module.exports = db;