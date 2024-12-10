function ArrowUp({ strokeColor = "#000", strokeWidth = 2.4 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke={strokeColor}
            viewBox="0 0 32 32"
            className="h-4 w-4"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
                fill="#000"
                d="M12 7a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L12 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 12 7Z"
            />
        </svg>
    );
}
export default ArrowUp
