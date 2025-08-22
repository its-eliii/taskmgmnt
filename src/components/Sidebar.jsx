import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
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

export default Sidebar;