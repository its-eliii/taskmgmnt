import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Layout from "../components/Layout.jsx";
import Summary from "../components/Summary.jsx";
import Taskcard from "../components/Taskcard.jsx";

function Home() {
  const [tasksToday, setTasksToday] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks/today");
      const data = await res.json();

      if (Array.isArray(data)) {
        setTasksToday(data);
      } else {
        console.error("Backend returned error:", data);
        setTasksToday([]); // fallback to empty array
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasksToday([]); // prevent crash
    }
  };


useEffect(() => {  
  fetchTasks();
}, []);

  const groupedTasks = {
    urgent: [],
    'non-urgent': [],
    late: []
  };

  tasksToday.forEach(task => {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  });

  const taskCountToday = tasksToday.length;

  return (
    <Layout>
      <Summary tasks={taskCountToday} />
      <div className="events">
        <div className="data">
          <p>Urgent: {groupedTasks.urgent.length}</p>
          <p>Non-Urgent: {groupedTasks['non-urgent'].length}</p>
          <p>Late: {groupedTasks.late.length}</p>
        </div>
        <div className="listtask">
          <div className="u-task">
            {groupedTasks.urgent.map(task => (
              <Taskcard key={task.id} task={task} onDone={fetchTasks} />
            ))}
          </div>
          <div className="nu-task">
            {groupedTasks['non-urgent'].map(task => (
              <Taskcard key={task.id} task={task} onDone={fetchTasks} />
            ))}
          </div>
          <div className="l-task">
            {groupedTasks.late.map(task => (
              <Taskcard key={task.id} task={task} onDone={fetchTasks} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;