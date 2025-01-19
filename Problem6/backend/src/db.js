// db.js
import mysql from "mysql2";

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost", // Your MySQL server address
  user: "root", // Your MySQL username (e.g., 'root')
  password: "amal1234", // Your MySQL password
  database: "world", // The name of your database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
