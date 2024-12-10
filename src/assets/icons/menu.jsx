function MenuIcon({ strokeColor = "#000", strokeWidth = 2.4 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={strokeColor}
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    );
}
export default MenuIcon
