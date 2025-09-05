import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout"; // adjust path if needed
import "../styles/Done.css";

export default function Done() {
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/tasks/done")
      .then(res => setDoneTasks(res.data))
      .catch(err => console.error("Error fetching done tasks:", err));
  }, []);

  return (
    <Layout>
      <div className="done-container">
        <h2>Completed Tasks</h2>
        {doneTasks.length === 0 ? (
          <p className="no-done">No completed tasks yet.</p>
        ) : (
          <ul className="done-list">
            {doneTasks.map(task => (
              <li key={task.id} className="done-item">
                <div className="done-title">{task.title}</div>
                <div className="done-meta">
                  <span>{task.description}</span>
                  <span className="done-date">
                    {new Date(task.due).toLocaleString("en-PH", {
                      timeZone: "Asia/Manila",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}