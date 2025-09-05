import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen }) {
    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'link active' : 'link'}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tasks" className={({ isActive }) => isActive ? 'link active' : 'link'}>
                        Tasks
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/done" className={({ isActive }) => isActive ? 'link active' : 'link'}>
                        Done
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

