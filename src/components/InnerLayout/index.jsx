import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    return (
        <div className="flex overflow-x-hidden ">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 bg-secondBackAdmin-light dark:bg-secondBackAdmin-dark">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout


