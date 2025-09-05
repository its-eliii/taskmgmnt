import "../styles/Header.css";
import { Link } from "react-router-dom";

export default function Header({ toggleSidebar }) {
    return (
        <div className="header">
            <Link to="/" style={{ textDecoration: "none", color: "#ECF0F1" }}>
                <h1>TaskMan</h1>
            </Link>
            <button className="hamburger" onClick={toggleSidebar}>
                ☰
            </button>
        </div>
    );
}