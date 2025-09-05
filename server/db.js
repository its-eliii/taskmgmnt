import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool for better stability
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optional: test a connection from the pool
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.error(err);
    } else {
        console.log('Connected to the database');
        connection.release(); // release back to pool
    }
});

console.log("🔍 ENV values:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


export default db;