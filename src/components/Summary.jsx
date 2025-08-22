import React from "react";
import "../styles/Summary.css";

const Summary = ({ tasks }) => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return (
        <div className="summary">
            <div className="date-task">
                <h2>{date}</h2>
                <p>You have {tasks} to be done today</p>
            </div>
            <div className="time">
                <h3>{time}</h3>
            </div>
        </div>
    );
}

export default Summary;