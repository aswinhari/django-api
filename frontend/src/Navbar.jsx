import React from "react";
import { FaTasks } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-primary px-4">
            <span className="navbar-brand fw-bold">
                <FaTasks className="me-2" />
                TaskMate
            </span>

            <span className="text-white">
                Personal Task Manager
            </span>
        </nav>
    );
}

export default Navbar;