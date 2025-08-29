import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "../styles/Tasks.css";
import Layout from "../components/Layout";
import TaskModal from "../components/TaskModal";
import Taskcard from "../components/Taskcard";

export default function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchAllTasks = async () => {
    try {
      const res = await fetch("https://taskmgmnt-backend.onrender.com/tasks");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAllTasks(data);
      } else {
        console.error("Error loading tasks:", data);
        setAllTasks([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setAllTasks([]);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch("https://taskmgmnt-backend.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Task added!");
        fetchAllTasks();
      } else {
        alert("❌ Failed to add task.");
      }
    } catch (error) {
      alert("⚠️ Error adding task.");
      console.error("Create error:", error);
    }
  };

  const visibleTasks = allTasks.filter(task => {
    if (task.status === "done") return false;
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  return (
    <Layout>
        <div className="top-content">
            <div className="filter-dropdown">
                <label htmlFor="statusFilter">Filter:</label>
                <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="urgent">Urgent</option>
                    <option value="non-urgent">Non-Urgent</option>
                    <option value="late">Late</option>
                </select>
            </div>
            <button onClick={() => setShowModal(true)}>
            <FaPlus style={{ marginRight: "8px" }} />
            Create Task
            </button>
        </div>

        <div className="task-list">
            {visibleTasks.length === 0 ? (
            <p>No tasks found.</p>
            ) : (
            visibleTasks.map(task => (
                <Taskcard key={task.id} task={task} onDone={fetchAllTasks} />
            ))
            )}
        </div>

        <TaskModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            mode="add"
            onSubmit={handleCreate}
        />
    </Layout>
  );
}