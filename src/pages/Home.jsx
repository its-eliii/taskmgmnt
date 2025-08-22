import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { event as dummyTasks } from "../data/tasks";
import "../styles/Home.css";
import Layout from "../components/Layout.jsx";
import Summary from "../components/Summary.jsx";
import Taskcard from "../components/Taskcard.jsx";
import Calendar from "../components/Calendar.jsx";


const STATUS = {
  NON_URGENT: { label: "Non-Urgent", color: "#B168FF" },
  URGENT: { label: "Urgent", color: "#FF7777" },
  LATE: { label: "Late", color: "#FFB751" },
  DONE: { label: "Done", color: "#51FF63" },
};

const taskModal = () => {
    // Logic to create a new task, ganito muna 
    console.log("Open task modal");
}

function Home() {

    const today = new Date().toLocaleDateString("en-CA");
    
    const tasksToday = dummyTasks.filter(task => task.dueDate === today && task.status !== "done");
    const taskCountToday = tasksToday.length;

    console.log(today, tasksToday, taskCountToday);


    return (
        <Layout>
            <Summary tasks={taskCountToday} />
            <div className="events">
                <div className="calendar">
                    <Calendar />
                    <p>Calendar feature coming soon...</p>

                </div>
                <div className="task">
                    <div className="createtask">
                        <button onClick={taskModal} className="taskbtn">
                        <FaPlus style={{ marginRight: "8px" }} />
                        Create a Task
                        </button>
                    </div>
                    <div className="listtask">
                        {/* task cards will be put here */}
                        {taskCountToday > 0 ? (tasksToday.map(task => (
                            <Taskcard key={task.id} task={task}/>
                        ))
                        ) : (
                            <p className="no-tasks">No tasks for today.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;