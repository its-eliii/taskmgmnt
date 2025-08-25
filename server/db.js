import mysql from 'mysql2';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_taskmanager',
    password: '#35z@pnMSxaM!4Q',  
    database: 'freedb_manage_task'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});