function ErrorIcono({ strokeColor = "#000", strokeWidth = 2.4 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6"
        >
            <path
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
                d="M12 16h.01M12 8v4m0 9a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
            />
        </svg>
    );
}

export default ErrorIcono;
