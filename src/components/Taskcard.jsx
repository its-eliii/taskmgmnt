import "../styles/Taskcard.css";

// const Taskcard = ({ task }) => {
//     return (
//         <div className="task-card">
//             <h3 className="task-title">{task.title}</h3>
//             <p className="task-description">{task.description}</p>
//             <p className={`task-status ${task.status}`}>{task.status}</p>
//             <p className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
//         </div>
//     );
// }
const markAsDone = () => {
    // Logic to mark the task as done
    console.log("Task marked as done");
}

const Taskcard = ({ task }) => {
    return (
        <div className={`task-card ${task.status}`}>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-due"><strong>Due: </strong> {task.dueDate}</p>

            <button onClick={markAsDone} className="madbtn">Mark as Done</button>
        </div>
    )
}

export default Taskcard;