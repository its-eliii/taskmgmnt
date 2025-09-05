import React, { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (
        <div className="layout">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} />
            <main className="content">
                {children}
            </main>
        </div>
    );
}