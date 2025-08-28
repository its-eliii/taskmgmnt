import mysql from 'mysql2';

// Create a connection pool for better stability
const db = mysql.createPool({
    host: 'sql.freedb.tech',
    user: 'freedb_taskmanager',
    password: '#35z@pnMSxaM!4Q',
    database: 'freedb_manage_task',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optional: test a connection from the pool
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database');
        connection.release(); // release back to pool
    }
});

export default db;