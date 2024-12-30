import { useState, useEffect } from "react";
import MenuIcon from "../../assets/icons/menu";
import LightMode from "../../assets/icons/lightMode";
import DarkMode from "../../assets/icons/darkMode";
import LogOut from "../../assets/icons/LogOut";
import { useAuth } from "../Services/Auth/auth";

function Header({ toggleSidebar }) {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark" || false
    );
    const { user, logout } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        logout();
    };


    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header className="h-16 flex items-center p-4 text-semibold border-2 border-borderAdmin-light dark:border-borderAdmin-dark bg-backAdmin-light text-textAdmin-dark dark:bg-backAdmin-dark dark:text-textAdmin-dark">
            <button className="p-1 mr-4" onClick={toggleSidebar}>
                <MenuIcon strokeColor={isDarkMode ? "#e9ecef" : "#172340"} strokeWidth={3} />
            </button>
            <h1 className="flex-1">Bienvenido {user.usuario}</h1>
            <button
                onClick={toggleTheme}
                className="p-2 rounded  text-white dark:text-black"
            >
                {isDarkMode ? <LightMode /> : <DarkMode />}
            </button>
            <button onClick={handleSubmit} className="p-2 rounded text-white dark:text-black">
                <LogOut />
            </button>

        </header>
    );
}

export default Header;
