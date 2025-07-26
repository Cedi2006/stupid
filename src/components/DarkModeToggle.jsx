import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

// Dark mode : tout noir sauf le toggle
export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'ultra-dark';
    });

    useEffect(() => {
        if (darkMode) {
            // Ajoute un overlay noir sur tout le body
            let overlay = document.getElementById("ultra-dark-overlay");
            if (!overlay) {
                overlay = document.createElement("div");
                overlay.id = "ultra-dark-overlay";
                overlay.style.position = "fixed";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100vw";
                overlay.style.height = "100vh";
                overlay.style.background = "#000";
                overlay.style.zIndex = "9998";
                overlay.style.pointerEvents = "none";
                overlay.style.transition = "background 0.3s";
                document.body.appendChild(overlay);
            } else {
                overlay.style.background = "#000";
                overlay.style.display = "block";
            }
            localStorage.setItem('theme', 'ultra-dark');
        } else {
            // Retire le overlay
            const overlay = document.getElementById("ultra-dark-overlay");
            if (overlay) overlay.style.display = "none";
            localStorage.setItem('theme', 'light');
        }
        // On s'assure que le body n'a pas de couleur
        document.body.style.backgroundColor = "";
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-5 right-5 w-14 h-8 flex items-center p-1 rounded-full transition-colors duration-300 z-[9999]"
            style={{
                background: darkMode ? "#FCDC4B" : "#2F4F93",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                border: `2px solid ${darkMode ? "#FCDC4B" : "#2F4F93"}`,
            }}
        >
            <span
                className="transform transition-transform duration-300 flex items-center justify-center w-6 h-6 rounded-full"
                style={{
                    color: darkMode ? "#2F4F93" : "#FCDC4B",
                    background: "#fff",
                    transform: darkMode ? "translateX(24px)" : "translateX(0)"
                }}
            >
                {darkMode ? <FaSun /> : <FaMoon />}
            </span>
        </button>
    );
}