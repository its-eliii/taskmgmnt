import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const formatForSQL = (date) =>
  date.toLocaleString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).replace(",", "");

app.get('/tasks/today', (req, res) => {
  const now = new Date();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 0);

  const start = formatForSQL(startOfDay); // '2025-08-29 00:00:00'
  const end = formatForSQL(endOfDay);     // '2025-08-29 23:59:59'

  console.log("Fetching tasks due today between:", start, "and", end);

  const query = `SELECT * FROM tasks WHERE due BETWEEN ? AND ? AND status != 'done'`;
  db.query(query, [start, end], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "DB error", details: err.message });
    }

    const updatedResults = results.map(task => {
      const dueTime = new Date(task.due);
      if (dueTime < now && task.status !== 'done' && task.status !== 'late') {
        db.query('UPDATE tasks SET status = ? WHERE id = ?', ['late', task.id]);
        task.status = 'late';
      }
      return task;
    });

    res.json(updatedResults);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, status, due } = req.body;
  const query = `
    INSERT INTO tasks (title, description, status, due)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [title, description, status, due], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "DB error", details: err.message });
    }
    res.status(201).json({ message: "Task added", id: result.insertId });
  });
});

app.put('/tasks/:id/done', (req, res) => {
  const taskId = req.params.id;
  const query = `UPDATE tasks SET status = 'done' WHERE id = ?`;

  db.query(query, [taskId], (err, result) => {
    if (err) {
      console.error("Error updating task:", err);
      return res.status(500).json({ error: "DB error", details: err.message });
    }
    res.json({ message: "Task marked as done", id: taskId });
  });
});

app.get('/tasks', (req, res) => {
  const query = `SELECT * FROM tasks WHERE status != 'done' ORDER BY due ASC`; // ✅ descending order
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching all tasks:", err);
      return res.status(500).json({ error: "DB error", details: err.message });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});