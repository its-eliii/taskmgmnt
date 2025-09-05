import "../styles/Taskcard.css";

const Taskcard = ({ task, onDone }) => {
    const markAsDone = async () => {
        try {
        const res = await fetch(`http://localhost:3000/tasks/${task.id}/done`, {
            method: "PUT"
        });

        if (res.ok) {
            alert("✅ Task marked as done!");
            if (onDone) onDone();
        } else {
            alert("❌ Failed to mark task as done.");
        }
        } catch (err) {
            console.error("Error marking task as done:", err);
            alert("⚠️ Error occurred.");
        }
    };

    return (
        <div className={`task-card ${task.status}`}>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-due">
                <strong>Due: </strong>
                {new Date(task.due).toLocaleString("en-PH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Manila"
                })}
            </p>
            <button onClick={markAsDone} className="madbtn">Mark as Done</button>
        </div>
    );
};

export default Taskcard;