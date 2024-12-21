function ArrowLeft({ strokeColor = "#000", strokeWidth = 2 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={strokeColor}
            className="h-4 w-4">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
                d="M15 18l-6-6 6-6"
            />
        </svg>
    );
}
export default ArrowLeft;
