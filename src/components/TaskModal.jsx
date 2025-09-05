import React, { useEffect, useState } from "react";
import "../styles/TaskModal.css";

export default function TaskModal({ isOpen, onClose, mode = "add", taskData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "non-urgent", // ✅ fixed typo
    due: "",
  });

  useEffect(() => {
    if (mode === "update" && taskData) {
      setForm({
        title: taskData.title || "",
        description: taskData.description || "",
        status: taskData.status || "non-urgent",
        due: taskData.due || "",
      });
    }
  }, [mode, taskData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.due) {
      alert("Title and due date are required.");
      return;
    }
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{mode === "add" ? "Create Task" : "Update Task"}</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="non-urgent">Non-Urgent</option>
          <option value="urgent">Urgent</option>
        </select>
        <input type="datetime-local" name="due" value={form.due} onChange={handleChange} />
        <div className="buttons">
          <button onClick={handleSubmit}>{mode === "add" ? "Add Task" : "Update Task"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}