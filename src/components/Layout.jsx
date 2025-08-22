import React from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Header />
            <Sidebar />
            <main className="content">
                {children}
            </main>
        </div>
    );
}